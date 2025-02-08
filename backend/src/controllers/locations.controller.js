import Location from "../models/locations.model.js";
import Employee from "../models/employees.model.js";
import { BusinessEntity } from "../models/organizationalEntities.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createLocation = asyncHandler(async (req, res) => {
    const {
        locationName,
        locationType,
        locationId,
        mainPhone,
        capacity,
        capacityUsed,
        siteOwnership,
        siteManager,
        accessSafetySecurityEquipment,
        streetAddress1,
        streetAddress2,
        city,
        stateProvince,
        zipPostalCode,
        country,
        parentLocation,
        businessEntities,
        childLocations,
        latitude,
        longitude
    } = req.body;

    // if (!locationName || !locationId) {
    //     throw new ApiError(400, "Location name and ID are required");
    // }

    const existingLocation = await Location.findOne({
        $or: [{ locationName }, { locationId }]
    });

    if (existingLocation) {
        throw new ApiError(409, "Location with this name or ID already exists");
    }

    if (siteManager) {
        const managerExists = await Employee.findById(siteManager);
        if (!managerExists) {
            throw new ApiError(404, "Site manager not found");
        }
    }

    // Only validate parent location if it's provided and not empty
    if (parentLocation && parentLocation.trim() !== '') {
        const parentLocationExists = await Location.findById(parentLocation);
        if (!parentLocationExists) {
            throw new ApiError(404, "Parent location not found");
        }
    }

    if (businessEntities && businessEntities.length > 0) {
        const businessEntityIds = Array.isArray(businessEntities) ? businessEntities : [businessEntities];
        const foundEntities = await BusinessEntity.find({
            _id: { $in: businessEntityIds }
        });

        if (foundEntities.length !== businessEntityIds.length) {
            throw new ApiError(404, "One or more business entities not found");
        }
    }

    if (childLocations && childLocations.length > 0) {
        const childLocationIds = Array.isArray(childLocations) ? childLocations : [childLocations];
        const foundChildLocations = await Location.find({
            _id: { $in: childLocationIds }
        });

        if (foundChildLocations.length !== childLocationIds.length) {
            throw new ApiError(404, "One or more child locations not found");
        }
    }

    // Validate capacity
    // if (capacity < 0) {
    //     throw new ApiError(400, "Capacity cannot be negative");
    // }

    if (capacityUsed > capacity) {
        throw new ApiError(400, "Capacity used cannot be greater than total capacity");
    }

    const location = await Location.create({
        locationName,
        locationType,
        locationId,
        mainPhone,
        capacity: capacity || 0,
        capacityUsed: capacityUsed || 0,
        siteOwnership,
        siteManager,
        accessSafetySecurityEquipment,
        streetAddress1,
        streetAddress2,
        city,
        stateProvince,
        zipPostalCode,
        country,
        parentLocation,
        businessEntities: businessEntities || [],
        childLocations: childLocations || [],
        latitude,
        longitude
    });

    if (parentLocation) {
        await Location.findByIdAndUpdate(
            parentLocation,
            { $push: { childLocations: location._id } }
        );
    }

    if (childLocations && childLocations.length > 0) {
        await Location.updateMany(
            { _id: { $in: childLocations } },
            { $set: { parentLocation: location._id } }
        );
    }

    const populatedLocation = await Location.findById(location._id)
        .populate("siteManager", "firstName lastName employeeID")
        .populate("parentLocation", "locationName locationId")
        .populate("childLocations", "locationName locationId")
        .populate("businessEntities", "businessEntity businessEntityType businessEntityId");

    return res.status(201).json(
        new ApiResponse(201, populatedLocation, "Location created successfully")
    );
});

const getAllLocations = asyncHandler(async (req, res) => {
    const locations = await Location.find()
        .populate("siteManager", "firstName lastName email")
        .populate("parentLocation", "locationName")
        .populate("childLocations", "locationName")
        .populate("businessEntities", "name");

    return res.status(200).json(
        new ApiResponse(200, locations, "Locations retrieved successfully")
    );
});

const getLocationById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const location = await Location.findById(id)
        .populate("siteManager", "firstName lastName email")
        .populate("parentLocation", "locationName")
        .populate("childLocations", "locationName")
        .populate("businessEntities", "name");

    if (!location) {
        throw new ApiError(404, "Location not found");
    }

    return res.status(200).json(
        new ApiResponse(200, location, "Location retrieved successfully")
    );
});

const updateLocation = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    // Find existing location
    const location = await Location.findById(id);
    if (!location) {
        throw new ApiError(404, "Location not found");
    }

    // Validate site manager if provided
    if (updateData.siteManager === "") {
        updateData.siteManager = null;
    } else if (updateData.siteManager) {
        const managerExists = await Employee.findById(updateData.siteManager);
        if (!managerExists) {
            throw new ApiError(404, "Site manager not found");
        }
    }

    // Validate parent location if provided
    if (updateData.parentLocation === "") {
        updateData.parentLocation = null;
    } else if (updateData.parentLocation) {
        const parentLocationExists = await Location.findById(updateData.parentLocation);
        if (!parentLocationExists) {
            throw new ApiError(404, "Parent location not found");
        }
        // Prevent circular reference
        if (updateData.parentLocation.toString() === id) {
            throw new ApiError(400, "Location cannot be its own parent");
        }
    }

    // Handle empty arrays or convert single values to arrays for businessEntities
    if (updateData.businessEntities === "") {
        updateData.businessEntities = [];
    } else if (updateData.businessEntities) {
        const businessEntityIds = Array.isArray(updateData.businessEntities) 
            ? updateData.businessEntities 
            : [updateData.businessEntities];
        
        if (businessEntityIds.length > 0) {
            const foundEntities = await BusinessEntity.find({
                _id: { $in: businessEntityIds }
            });

            if (foundEntities.length !== businessEntityIds.length) {
                throw new ApiError(404, "One or more business entities not found");
            }
        }
    }

    // Handle empty arrays or convert single values to arrays for childLocations
    if (updateData.childLocations === "") {
        updateData.childLocations = [];
    } else if (updateData.childLocations) {
        const childLocationIds = Array.isArray(updateData.childLocations) 
            ? updateData.childLocations 
            : [updateData.childLocations];
        
        if (childLocationIds.length > 0) {
            const foundChildLocations = await Location.find({
                _id: { $in: childLocationIds }
            });

            if (foundChildLocations.length !== childLocationIds.length) {
                throw new ApiError(404, "One or more child locations not found");
            }

            // Prevent circular reference
            if (childLocationIds.includes(id)) {
                throw new ApiError(400, "Location cannot be its own child");
            }
        }
    }

    // Handle empty strings for other fields
    const fieldsToUpdate = {
        locationName: updateData.locationName === undefined ? location.locationName : updateData.locationName,
        locationType: updateData.locationType === undefined ? location.locationType : updateData.locationType,
        locationId: updateData.locationId === undefined ? location.locationId : updateData.locationId,
        mainPhone: updateData.mainPhone === undefined ? location.mainPhone : updateData.mainPhone,
        capacity: updateData.capacity === undefined ? location.capacity : updateData.capacity,
        capacityUsed: updateData.capacityUsed === undefined ? location.capacityUsed : updateData.capacityUsed,     
        siteOwnership: updateData.siteOwnership === undefined ? location.siteOwnership : updateData.siteOwnership,
        siteManager: updateData.siteManager === undefined ? location.siteManager : updateData.siteManager,
        accessSafetySecurityEquipment: updateData.accessSafetySecurityEquipment === undefined ? 
            location.accessSafetySecurityEquipment : updateData.accessSafetySecurityEquipment,
        streetAddress1: updateData.streetAddress1 === undefined ? location.streetAddress1 : updateData.streetAddress1,
        streetAddress2: updateData.streetAddress2 === undefined ? location.streetAddress2 : updateData.streetAddress2,
        city: updateData.city === undefined ? location.city : updateData.city,
        stateProvince: updateData.stateProvince === undefined ? location.stateProvince : updateData.stateProvince,
        zipPostalCode: updateData.zipPostalCode === undefined ? location.zipPostalCode : updateData.zipPostalCode,
        country: updateData.country === undefined ? location.country : updateData.country,
        parentLocation: updateData.parentLocation === undefined ? location.parentLocation : updateData.parentLocation,
        businessEntities: updateData.businessEntities === undefined ? location.businessEntities : updateData.businessEntities,
        childLocations: updateData.childLocations === undefined ? location.childLocations : updateData.childLocations,
        latitude: updateData.latitude === undefined ? location.latitude : updateData.latitude,
        longitude: updateData.longitude === undefined ? location.longitude : updateData.longitude
    };

    // Update the location
    const updatedLocation = await Location.findByIdAndUpdate(
        id,
        fieldsToUpdate,
        { new: true }
    ).populate([
        { path: "siteManager", select: "firstName lastName employeeID" },
        { path: "parentLocation", select: "locationName locationId" },
        { path: "childLocations", select: "locationName locationId" },
        { path: "businessEntities", select: "businessEntity businessEntityType businessEntityId" }
    ]);

    return res.status(200).json(
        new ApiResponse(200, updatedLocation, "Location updated successfully")
    );
});

const deleteLocation = asyncHandler(async (req, res) => {
    try {
        const locationId = req.params.id;
        const location = await Location.findById(locationId);

    if (!location) {
            return res.status(404).json({
                success: false,
                message: "Location not found"
            });
        }

        // Check for references before deletion
        const references = [];

        // Check if location is used as a site manager's location
        const hasSiteManager = await Employee.findOne({ 
            'location._id': locationId 
        });
        if (hasSiteManager) {
            references.push(`Site Manager: ${hasSiteManager.fullName}`);
        }

        // Check if location is used as a child location
        const hasParentLocation = await Location.findOne({ 
            'childLocations._id': locationId 
        });
        if (hasParentLocation) {
            references.push(`Child Locations: ${location.locationName}`);
        }

        // Check if location is referenced by business entities
        const hasBusinessEntities = await BusinessEntity.find({
            'relatedLocations._id': locationId
        });
        if (hasBusinessEntities.length > 0) {
            const entityNames = hasBusinessEntities
                .map(entity => entity.businessEntity)
                .join(", ");
            references.push(`Business Entities: ${entityNames}`);
        }

        // If there are references, return error with details
        if (references.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Cannot delete location. Please remove the following references first:\n" + 
                        references.join("\n")
            });
        }

        // If no references exist, proceed with deletion
        // First remove this location from any parent's childLocations array
    if (location.parentLocation) {
            await Location.updateOne(
                { _id: location.parentLocation._id },
                { $pull: { childLocations: { _id: locationId } } }
            );
        }

        // Then remove this location from any child's parentLocation field
    await Location.updateMany(
            { 'parentLocation._id': locationId },
        { $unset: { parentLocation: "" } }
    );

        // Finally delete the location
        await Location.findByIdAndDelete(locationId);

        return res.status(200).json({
            success: true,
            message: "Location deleted successfully"
        });

    } catch (error) {
        console.error("Error in deleteLocation:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});

export {
    createLocation,
    getAllLocations,
    getLocationById,
    updateLocation,
    deleteLocation
};
