import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { BusinessEntity } from "../models/organizationalEntities.model.js";
import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import Location from "../models/locations.model.js";
import Employee from "../models/employees.model.js";



const createOrganizationalEntity = asyncHandler(async (req, res) => {
    const {
        businessEntityType,
        businessEntityId,
        businessEntity,
        editors,
        description,
        parentBusinessEntity,
        childBusinessEntities,
        relatedLocations,
        employees, // New Field Added
        applications,
        locations
    } = req.body;

    // Validate required fields
    if (!businessEntityType || !businessEntity) {
        throw new ApiError(400, "businessEntityType and businessEntity fields must be provided");
    }

    // Check if businessEntityId is provided and unique
    let businessEntityIdValue = businessEntityId || null;
    if (businessEntityIdValue) {
        const existingBusinessEntityId = await BusinessEntity.findOne({ businessEntityId: businessEntityIdValue });
        if (existingBusinessEntityId) {
            throw new ApiError(409, "businessEntityId must be unique");
        }
    }

    // Check if entity already exists by name
    const existingEntity = await BusinessEntity.findOne({ businessEntity });
    if (existingEntity) {
        throw new ApiError(409, "Entity with this name already exists");
    }

    // Validate and find parent business entity
    let parentEntityId = null;
    if (parentBusinessEntity) {
        const parentEntity = await BusinessEntity.findOne({ businessEntity: parentBusinessEntity });
        if (!parentEntity) {
            throw new ApiError(404, "Parent business entity not found");
        }
        parentEntityId = parentEntity._id;
    }

    // Validate and find related locations
    let relatedLocationIds = [];
    if (relatedLocations?.length) {
        const foundLocations = await Location.find({
            $or: [
                { locationName: { $in: relatedLocations } },
                { locationId: { $in: relatedLocations } }
            ]
        });

        if (foundLocations.length !== relatedLocations.length) {
            const notFoundLocations = relatedLocations.filter(
                loc => !foundLocations.some(found => found.locationName === loc || found.locationId === loc)
            );
            // throw new ApiError(400, Some locations were not found: ${notFoundLocations.join(', ')});
        }

        relatedLocationIds = foundLocations.map(location => location._id);
    }

    // Validate and find editors
    let editorIds = [];
    if (editors?.length) {
        editorIds = await User.find({
            $or: [
                { username: { $in: editors } },
                { fullName: { $in: editors } }
            ]
        }).distinct('_id');

        if (editorIds.length === 0) {
            throw new ApiError(400, "No editors found with the provided names/usernames");
        }
    }

    // Validate and find employees
    // Validate and find employees (removed validation)
let employeeIds = [];
if (employees?.length) {
    // Directly associate the provided employee names or usernames without validation
    employeeIds = employees; // Just assign the values directly without querying the database
}

let locationIds = [];
if (locations?.length) {
    // Directly associate the provided location names or usernames without validation
    locationIds = locations; // Just assign the values directly without querying the database
}

let applicationIds = [];
if (applications?.length) {
    // Directly associate the provided location names or usernames without validation
    applicationIds =applications; // Just assign the values directly without querying the database
}
// You can now proceed with the rest of the logic where employeeIds will be directly used


    // Validate and find child business entities
    let childEntityIds = [];
    if (childBusinessEntities?.length) {
        childEntityIds = await BusinessEntity.find({
            businessEntity: { $in: childBusinessEntities }
        }).distinct('_id');

        if (childEntityIds.length === 0) {
            throw new ApiError(400, "No valid child business entities found");
        }
    }

    // Create the organizational entity
    const newOrganizationalEntity = await BusinessEntity.create({
        businessEntityType,
        businessEntityId: businessEntityIdValue,
        businessEntity,
        description,
        editors: editorIds,
        employees: employeeIds,
        locations: locationIds,
        applications: applicationIds,
        parentBusinessEntity: parentEntityId,
        childBusinessEntities: childEntityIds,
        relatedLocations: relatedLocationIds
    });

    // Update parent's childBusinessEntities if parent exists
    if (parentEntityId) {
        await BusinessEntity.findByIdAndUpdate(
            parentEntityId,
            { $addToSet: { childBusinessEntities: newOrganizationalEntity._id } }
        );
    }
    await Employee.updateMany(
        { _id: { $in: employeeIds } },
        { $addToSet: { businessEntities: newOrganizationalEntity._id } } // Add the business entity to each employee
      );
      
    // Populate the response with related data
    const populatedEntity = await BusinessEntity.findById(newOrganizationalEntity._id)
        .populate('parentBusinessEntity', 'businessEntity businessEntityType businessEntityId description')
        .populate('childBusinessEntities', 'businessEntity businessEntityType businessEntityId description')
        .populate('editors', 'username fullName email')
        .populate('employees', 'departmentNames')
        .populate('locations', 'locationName')
        .populate('applications', 'applicationName applicationId applicationType city stateProvince country')
        .populate('relatedLocations', 'locationName locationId locationType city stateProvince country');

    return res.status(201).json(
        new ApiResponse(201, populatedEntity, "Organizational Entity Created Successfully!")
    );
});


const updateOrganizationalEntity = asyncHandler(async (req, res) => {
    const { id } = req.params; // Get the ID from URL parameters
    const {
        businessEntityType,
        businessEntityId,
        businessEntity,
        editors,
        description,
        parentBusinessEntity,
        childBusinessEntities,
        relatedLocations,
        employees, // New Field Added
        locations,
        applications
    } = req.body;

    // Validate required fields
    if (!businessEntityType || !businessEntity) {
        throw new ApiError(400, "businessEntityType and businessEntity fields must be provided");
    }

    // Check if the entity exists
    const existingEntity = await BusinessEntity.findById(id);
    if (!existingEntity) {
        throw new ApiError(404, "Organizational entity not found");
    }

    // Check if businessEntityId is provided and unique (if it's updated)
    if (businessEntityId && businessEntityId !== existingEntity.businessEntityId) {
        const existingBusinessEntityId = await BusinessEntity.findOne({ businessEntityId });
        if (existingBusinessEntityId) {
            throw new ApiError(409, "businessEntityId must be unique");
        }
    }

    // Check if entity name is updated and exists
    if (businessEntity !== existingEntity.businessEntity) {
        const duplicateEntity = await BusinessEntity.findOne({ businessEntity });
        if (duplicateEntity) {
            throw new ApiError(409, "Entity with this name already exists");
        }
    }

    // Validate and find parent business entity
    let parentEntityId = existingEntity.parentBusinessEntity;
    if (parentBusinessEntity) {
        const parentEntity = await BusinessEntity.findOne({ businessEntity: parentBusinessEntity });
        if (!parentEntity) {
            throw new ApiError(404, "Parent business entity not found");
        }
        parentEntityId = parentEntity._id;
    }

    // Validate and find related locations
    let relatedLocationIds = existingEntity.relatedLocations;
    if (relatedLocations?.length) {
        const foundLocations = await Location.find({
            $or: [
                { locationName: { $in: relatedLocations } },
                { locationId: { $in: relatedLocations } }
            ]
        });

        if (foundLocations.length !== relatedLocations.length) {
            const notFoundLocations = relatedLocations.filter(
                loc => !foundLocations.some(found => found.locationName === loc || found.locationId === loc)
            );
            // throw new ApiError(400, Some locations were not found: ${notFoundLocations.join(', ')});
        }

        relatedLocationIds = foundLocations.map(location => location._id);
    }

    // Validate and find editors
    let editorIds = existingEntity.editors;
    if (editors?.length) {
        editorIds = await User.find({
            $or: [
                { username: { $in: editors } },
                { fullName: { $in: editors } }
            ]
        }).distinct('_id');

        if (editorIds.length === 0) {
            throw new ApiError(400, "No editors found with the provided names/usernames");
        }
    }

    // Validate and find employees
    let employeeIds = existingEntity.employees;
    if (employees?.length) {
        employeeIds = employees; // Directly assign the values
    }

    let locationIds = existingEntity.locations;
    if (locations?.length) {
        locationIds = locations; // Directly assign the values
    }

    let applicationIds = existingEntity.applications;
    if (applications?.length) {
        applicationIds = applications; // Directly assign the values
        }
    // Validate and find child business entities
    let childEntityIds = existingEntity.childBusinessEntities;
    if (childBusinessEntities?.length) {
        childEntityIds = await BusinessEntity.find({
            businessEntity: { $in: childBusinessEntities }
        }).distinct('_id');

        if (childEntityIds.length === 0) {
            throw new ApiError(400, "No valid child business entities found");
        }
    }

    // Update the organizational entity
    existingEntity.businessEntityType = businessEntityType || existingEntity.businessEntityType;
    existingEntity.businessEntityId = businessEntityId || existingEntity.businessEntityId;
    existingEntity.businessEntity = businessEntity || existingEntity.businessEntity;
    existingEntity.description = description || existingEntity.description;
    existingEntity.editors = editorIds.length > 0 ? editorIds : existingEntity.editors;
    existingEntity.employees = employeeIds.length > 0 ? employeeIds : existingEntity.employees;
    existingEntity.locations = locationIds.length > 0 ? locationIds : existingEntity.locations;
    existingEntity.applications = applicationIds.length > 0 ? applicationIds : existingEntity.applications
    existingEntity.parentBusinessEntity = parentEntityId || existingEntity.parentBusinessEntity;
    existingEntity.childBusinessEntities = childEntityIds.length > 0 ? childEntityIds : existingEntity.childBusinessEntities;
    existingEntity.relatedLocations = relatedLocationIds.length > 0 ? relatedLocationIds : existingEntity.relatedLocations;

    await existingEntity.save();

    // Update parent's childBusinessEntities if parent exists
    if (parentEntityId && !existingEntity.parentBusinessEntity.equals(parentEntityId)) {
        await BusinessEntity.findByIdAndUpdate(
            parentEntityId,
            { $addToSet: { childBusinessEntities: existingEntity._id } }
        );
    }

    // Explicitly update employee and location associations
    await Employee.updateMany(
        { _id: { $in: employeeIds } },
        { $addToSet: { businessEntities: existingEntity._id } } // Add the business entity to each employee
    );

    // Populate the response with related data
    const populatedEntity = await BusinessEntity.findById(existingEntity._id)
        .populate('parentBusinessEntity', 'businessEntity businessEntityType businessEntityId description')
        .populate('childBusinessEntities', 'businessEntity businessEntityType businessEntityId description')
        .populate('editors', 'username fullName email')
        .populate('employees', 'departmentNames')
        .populate('locations', 'locationName')
        .populate('applications', 'applicationName ')
        .populate('relatedLocations', 'locationName locationId locationType city stateProvince country');
        

    return res.status(200).json(
        new ApiResponse(200, populatedEntity, "Organizational Entity Updated Successfully!")
    );
});



const deleteOrganizationalEntity = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const entityToDelete = await BusinessEntity.findById(id);

    if (!entityToDelete) {
        throw new ApiError(404, "Organizational Entity not found");
    }

    // Remove this entity from its parent's childBusinessEntities
    if (entityToDelete.parentBusinessEntity) {
        await BusinessEntity.findByIdAndUpdate(
            entityToDelete.parentBusinessEntity,
            {
                $pull: { childBusinessEntities: id }
            }
        );
    }

    // Remove this entity from any childBusinessEntities in other entities
    await BusinessEntity.updateMany(
        { childBusinessEntities: id },
        { $pull: { childBusinessEntities: id } } // Remove from child entities
    );

    // Remove this entity from any parentBusinessEntity references in other entities
    await BusinessEntity.updateMany(
        { parentBusinessEntity: id },
        { $set: { parentBusinessEntity: null } } // Set parent to null
    );

    // Delete all child entities of the parent
    await BusinessEntity.deleteMany({ parentBusinessEntity: entityToDelete._id });

    // Delete the entity
    await BusinessEntity.findByIdAndDelete(id);

    return res.status(200).json(
        new ApiResponse(200, {}, "Organizational Entity Deleted Successfully!")
    );
})

const getOrganizationalEntityDetails = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // ✅ Validate ID before querying
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid Business Entity ID");
    }

    // ✅ Fetch Business Entity and populate related fields
    const entity = await BusinessEntity.findById(id)
        .populate('parentBusinessEntity', 'businessEntity businessEntityType businessEntityId description')
        .populate('childBusinessEntities', 'businessEntity businessEntityType businessEntityId description')
        .populate('editors', 'username fullName email')
        .populate('locations', 'locationName locationId locationType city stateProvince country mainPhone capacity capacityUsed latitude longitude siteOwnership siteManager accessSafetySecurityEquipment streetAddress1 streetAddress2 zipPostalCode')
        .populate('employees', 'employeeID firstName lastName preferredName title timeZone workEmailAddress workPhone workMobilePhone fax manager subordinates employeeStatus departmentNames')
        .populate('applications', 'applicationName applicationID applicationType applicationAlias applicationURL description hostedType drStrategy rto rpo city stateProvince country')
        .populate('relatedLocations', 'locationName locationId locationType city stateProvince country ');


    // ✅ Handle case where Business Entity is not found
    if (!entity) {
        throw new ApiError(404, "Organizational Entity not found");
    }

    return res.status(200).json(
        new ApiResponse(200, entity, "Organizational Entity details fetched successfully!")
    );
});


const getAllOrganizationalEntities = asyncHandler(async (req, res) => {
    const entities = await BusinessEntity.find()
        .populate('parentBusinessEntity', 'businessEntity businessEntityType businessEntityId description')
        .populate('childBusinessEntities', 'businessEntity businessEntityType businessEntityId description')
        .populate('editors', 'username fullName email')
        .populate('relatedLocations', 'locationName locationId locationType city stateProvince country');

    return res.status(200).json(
        new ApiResponse(200, entities, "Organizational Entities fetched successfully!")
    );
});
const updateApplications = async (req, res) => {
    try {
      const { applicationIds } = req.body;
      const businessEntityId = req.params.id;
  
      const updatedBusiness = await BusinessEntity.findByIdAndUpdate(
        businessEntityId,
        { applicationIds },
        { new: true }
      );
  
      res.status(200).json(updatedBusiness);
    } catch (error) {
      console.error("Error updating applications:", error);
      res.status(500).json({ error: 'Failed to update applications' });
    }
};
export {
    createOrganizationalEntity,
    updateOrganizationalEntity,
    deleteOrganizationalEntity,
    getOrganizationalEntityDetails,
    getAllOrganizationalEntities,
    updateApplications
}