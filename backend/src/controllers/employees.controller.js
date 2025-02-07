import mongoose from 'mongoose';
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Employee from "../models/employees.model.js";
import {BusinessEntity} from "../models/organizationalEntities.model.js";
import Location from "../models/locations.model.js";    

// Create a new employee
const createEmployee = asyncHandler(async (req, res) => {
    const {
        employeeID, firstName, middleName, lastName, preferredName,
        title,
        timeZone,
        workEmailAddress, workPhone, workMobilePhone,
        fax,
        manager,
        subordinates,
        location,
        department,
        employeeStatus,
        streetAddress1,
        streetAddress2,
        city,
        zipPostalCode,
        stateProvince,
        country,
        homePhoneNumber,
        personalMobilePhone,
        personalEmailAddress,
    } = req.body;

    // Validate required fields
    // const requiredFields = ['employeeID', 'firstName', 'lastName', 'preferredName'];
    // const missingFields = requiredFields.filter(field => !req.body[field]);

    // if (missingFields.length > 0) {
    //     throw new ApiError(400, `Missing required fields: ${missingFields.join(', ')}`);
    // }

    // Check if employeeID, firstName, lastName, or preferredName already exist
    // const existingEmployee = await Employee.findOne({
    //     $or: [
    //         { employeeID },
    //         { firstName, lastName, middleName, preferredName }
    //     ]
    // });

    // if (existingEmployee) {
    //     throw new ApiError(409, "An employee with the same employeeID, first name, last name, or preferred name already exists.");
    // }

    // Verify if the Manager exists
    let managerId = null;
    let managerName = null;
    if (manager) {
        try {
            // First try to find by _id
            const managerDoc = await Employee.findById(manager);
            if (managerDoc) {
                managerId = managerDoc._id;
                managerName = `${managerDoc.firstName} ${managerDoc.lastName}`;
            } else {
                // If not found by ID, try by employeeID
                const managerByEmployeeId = await Employee.findOne({ 
                    employeeID: manager 
                });

                if (!managerByEmployeeId) {
                    // If still not found, try by full name
                    const [firstName, ...lastNameParts] = manager.split(' ');
                    const lastName = lastNameParts.join(' ');

                    const managerByName = await Employee.findOne({
                        firstName: firstName,
                        lastName: lastName
                    });

                    if (!managerByName) {
                        throw new ApiError(404, "Manager not found. Please use valid ID, Employee ID, or full name.");
                    }

                    managerId = managerByName._id;
                    managerName = `${managerByName.firstName} ${managerByName.lastName}`;
                } else {
                    managerId = managerByEmployeeId._id;
                    managerName = `${managerByEmployeeId.firstName} ${managerByEmployeeId.lastName}`;
                }
            }
        } catch (error) {
            if (error instanceof ApiError) throw error;
            throw new ApiError(404, "Invalid manager ID format or manager not found");
        }
    }

    // Process subordinates if they exist
    let subordinateIds = [];
    let subordinateNames = [];

    if (subordinates && Array.isArray(subordinates)) {
        try {
            // Find all subordinates by their IDs
            const subordinateDocs = await Employee.find({ 
                _id: { $in: subordinates }
            });

            if (subordinateDocs.length !== subordinates.length) {
                throw new ApiError(404, "One or more subordinates not found");
            }

            // Store both IDs and names
            subordinateIds = subordinateDocs.map(sub => sub._id);
            subordinateNames = subordinateDocs.map(sub => 
                `${sub.firstName} ${sub.lastName}`
            );
        } catch (error) {
            if (error instanceof ApiError) throw error;
            throw new ApiError(404, "Invalid subordinate ID format or subordinate not found");
        }
    }

    // Initialize department arrays
    let departmentIds = [];
    let departmentNames = [];
    
    // Only process departments if the array exists and is not empty
    if (department && Array.isArray(department) && department.length > 0) {
        try {
            // Process each department ID
            const departments = await BusinessEntity.find({ 
                _id: { $in: department }
            });

            if (departments.length !== department.length) {
                throw new ApiError(404, "One or more departments not found");
            }

            // Store both IDs and names
            departmentIds = departments.map(dept => dept._id);
            departmentNames = departments.map(dept => dept.businessEntity);
        } catch (error) {
            // If mongoose casting error or not found, try by name
            if (error instanceof ApiError) throw error;

            // Try finding by business entity name
            const departments = await BusinessEntity.find({ 
                businessEntity: { $in: department }
            });

            if (departments.length !== department.length) {
                throw new ApiError(404, "One or more departments not found");
            }

            departmentIds = departments.map(dept => dept._id);
            departmentNames = departments.map(dept => dept.businessEntity);
        }
    }

    // Verify if the Location exists
    let locationId = null;
    let locationName = null;

    // Handle location validation
    if (location) {
        if (Array.isArray(location)) {
            // If location is an empty array, keep locationId and locationName as null
            if (location.length > 0) {
                try {
                    // First try to find by _id (for location IDs)
                    const locationDocs = await Location.find({ 
                        _id: { $in: location }
                    });

                    if (locationDocs.length === location.length) {
                        // All locations found by ID
                        locationId = locationDocs.map(doc => doc._id);
                        locationName = locationDocs.map(doc => doc.locationName);
                    } else {
                        // If not all found by ID, try finding by locationName
                        const locationDocsByName = await Location.find({ 
                            locationName: { $in: location }
                        });

                        if (locationDocsByName.length !== location.length) {
                            throw new ApiError(404, "One or more locations not found");
                        }

                        locationId = locationDocsByName.map(doc => doc._id);
                        locationName = locationDocsByName.map(doc => doc.locationName);
                    }
                } catch (error) {
                    if (error instanceof ApiError) throw error;
                    
                    // If mongoose casting error, try by name
                    const locationDocsByName = await Location.find({ 
                        locationName: { $in: location }
                    });

                    if (locationDocsByName.length !== location.length) {
                        throw new ApiError(404, "One or more locations not found");
                    }

                    locationId = locationDocsByName.map(doc => doc._id);
                    locationName = locationDocsByName.map(doc => doc.locationName);
                }
            }
        } else {
            try {
                // First try to find by _id
                const locationDoc = await Location.findById(location);
                if (locationDoc) {
                    locationId = locationDoc._id;
                    locationName = locationDoc.locationName;
                } else {
                    // If not found by ID, try by name
                    const locationDocByName = await Location.findOne({
                        locationName: location
                    });

                    if (!locationDocByName) {
                        throw new ApiError(404, "Location not found");
                    }

                    locationId = locationDocByName._id;
                    locationName = locationDocByName.locationName;
                }
            } catch (error) {
                if (error instanceof ApiError) throw error;
                
                // If mongoose casting error, try by name
                const locationDocByName = await Location.findOne({
                    locationName: location
                });

                if (!locationDocByName) {
                    throw new ApiError(404, "Location not found");
                }

                locationId = locationDocByName._id;
                locationName = locationDocByName.locationName;
            }
        }
    }

    // Create employee with the processed data
    const employeeData = {
        employeeID,
        firstName,
        middleName,
        lastName,
        preferredName,
        title,
        timeZone,
        workEmailAddress,
        workPhone,
        workMobilePhone,
        fax,
        manager: managerId,
        managerName: managerName,
        subordinates: subordinateIds,
        subordinateNames: subordinateNames,
        location: locationId,
        locationName: locationName,
        department: departmentIds,
        departmentNames: departmentNames,
        // updatedBy: req.user._id,
        employeeStatus,
        streetAddress1,
        streetAddress2,
        city,
        zipPostalCode,
        stateProvince,
        country,
        homePhoneNumber,
        personalMobilePhone,
        personalEmailAddress
    };

    // Remove undefined or null values
    Object.keys(employeeData).forEach(key => {
        if (employeeData[key] === undefined || employeeData[key] === null) {
            delete employeeData[key];
        }
    });

    // Create the employee
    const newEmployee = await Employee.create(employeeData);

    // Populate the department references in the response
    const populatedEmployee = await Employee.findById(newEmployee._id)
        .populate('manager', 'firstName lastName employeeID')
        .populate('subordinates', 'firstName lastName employeeID')
        .populate('department', 'businessEntity businessEntityType businessEntityId')
        .populate('location', 'locationName locationId')
        .populate('updatedBy', 'fullName email');

    return res.status(201).json(
        new ApiResponse(201, populatedEmployee, "Employee Created Successfully!")
    );
});

// Get an employee by ID
const getEmployee = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const employee = await Employee.findById(id)
        .populate('manager')
        .populate('subordinates')
        .populate('location')
        .populate('department')
        .populate('updatedBy', 'fullName email');

    if (!employee) {
        throw new ApiError(404, "Employee not found");
    }

    return res.status(200).json(
        new ApiResponse(200, employee, "Employee details fetched successfully!")
    );
});

// Get all employees with filtering and pagination
const getAllEmployees = asyncHandler(async (req, res) => {
    // const { 
    //     page = 1, 
    //     limit = 10,
    //     search,
    //     department,
    //     employeeStatus 
    // } = req.query;

    // let query = {};

    // Search functionality
    // if (search) {
    //     query.$or = [
    //         { firstName: { $regex: search, $options: 'i' } },
    //         { lastName: { $regex: search, $options: 'i' } },
    //         { employeeID: { $regex: search, $options: 'i' } }
    //     ];
    // }

    // Department filter - using departmentNames array instead of department ObjectIds
    // if (department) {
    //     query.departmentNames = department;
    // }

    // // Status filter
    // if (employeeStatus) {
    //     query.employeeStatus = employeeStatus;
    // }

    const employees = await Employee.find()
        .populate('manager', 'firstName lastName employeeID')
        .populate('subordinates', 'firstName lastName employeeID')
        .populate('department', 'businessEntity businessEntityType businessEntityId')
        .populate('location', 'locationName locationId')
        .populate('updatedBy', 'fullName email')

    // const count = await Employee.countDocuments(query);

    return res.status(200).json(
        new ApiResponse(200, {
            employees,
        }, "Employees fetched successfully!")
    );
});

// Update an employee by ID
const updateEmployee = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const {
        employeeID, firstName, middleName, lastName, preferredName,
        title, timeZone, workEmailAddress, workPhone, workMobilePhone,
        fax, manager, subordinates, location, department,
        employeeStatus, streetAddress1, streetAddress2, city,
        zipPostalCode, stateProvince, country, homePhoneNumber,
        personalMobilePhone, personalEmailAddress,
    } = req.body;

    // Find the existing employee
    const existingEmployee = await Employee.findById(id);
    if (!existingEmployee) {
        throw new ApiError(404, "Employee not found");
    }

    // Process manager if provided
    let managerId = existingEmployee.manager;
    let managerName = existingEmployee.managerName;
    if (manager === "") {
        // If manager is provided as an empty string, set managerId to null
        managerId = null;
    } else if (manager) {
        const managerDoc = await Employee.findById(manager);
        if (!managerDoc) {
            throw new ApiError(404, "Manager not found");
        }
        managerId = managerDoc._id;
        managerName = `${managerDoc.firstName} ${managerDoc.lastName}`;
    }

    // Process subordinates if provided
    let subordinateIds = existingEmployee.subordinates;
    let subordinateNames = existingEmployee.subordinateNames
    if (subordinates && Array.isArray(subordinates)) {
        const subordinateDocs = await Employee.find({ 
            _id: { $in: subordinates }
        });
        if (subordinateDocs.length !== subordinates.length) {
            throw new ApiError(404, "One or more subordinates not found");
        }
        subordinateIds = subordinateDocs.map(sub => sub._id);
        subordinateNames = subordinateDocs.map(sub => 
            `${sub.firstName} ${sub.lastName}`
        );
    }

    // Process departments if provided
    let departmentIds = existingEmployee.department;
    let departmentNames = existingEmployee.departmentNames;
    if (department && Array.isArray(department)) {
        try {
            // First try to find by ID
            const departments = await BusinessEntity.find({ 
                _id: { $in: department }
            });

            if (departments.length === department.length) {
                // All found by ID
                departmentIds = departments.map(dept => dept._id);
                departmentNames = departments.map(dept => dept.businessEntity);
            } else {
                // If not all found by ID, try by name
                const departmentsByName = await BusinessEntity.find({ 
                    businessEntity: { $in: department }
                });

                if (departmentsByName.length !== department.length) {
                    throw new ApiError(404, "One or more departments not found");
                }

                departmentIds = departmentsByName.map(dept => dept._id);
                departmentNames = departmentsByName.map(dept => dept.businessEntity);
            }
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                // If cast error (invalid ObjectId), try finding by name directly
                const departmentsByName = await BusinessEntity.find({ 
                    businessEntity: { $in: department }
                });

                if (departmentsByName.length !== department.length) {
                    throw new ApiError(404, "One or more departments not found");
                }

                departmentIds = departmentsByName.map(dept => dept._id);
                departmentNames = departmentsByName.map(dept => dept.businessEntity);
            } else {
                throw error;
            }
        }
    }

    // Process location if provided
    let locationId = existingEmployee.location;
    let locationName = existingEmployee.locationName;

    // Handle location validation
    if (location !== undefined) {
        if (Array.isArray(location)) {
            // If location is an empty array, set location to null
            if (location.length === 0) {
                locationId = null;
                locationName = null;
            } else {
                // Handle non-empty array
                try {
                    const locationDoc = await Location.findById(location[0]);
                    if (!locationDoc) {
                        throw new ApiError(404, "Location not found");
                    }
                    locationId = locationDoc._id;
                    locationName = locationDoc.locationName;
                } catch (error) {
                    if (error instanceof ApiError) throw error;
                    throw new ApiError(404, "Invalid location format or location not found");
                }
            }
        } else if (location) {
            // Handle single location ID
            try {
                const locationDoc = await Location.findById(location);
                if (!locationDoc) {
                    throw new ApiError(404, "Location not found");
                }
                locationId = locationDoc._id;
                locationName = locationDoc.locationName;
            } catch (error) {
                if (error instanceof ApiError) throw error;
                throw new ApiError(404, "Invalid location format or location not found");
            }
        } else {
            // If location is null, empty string, or undefined
            locationId = null;
            locationName = null;
        }
    }

    // Update employee data
    const updateData = {
        employeeID: employeeID === undefined ? existingEmployee.employeeID : employeeID,
        firstName: firstName === undefined ? existingEmployee.firstName : firstName,
        middleName: middleName === undefined ? existingEmployee.middleName : middleName,
        lastName: lastName === undefined ? existingEmployee.lastName : lastName,
        preferredName: preferredName === undefined ? existingEmployee.preferredName : preferredName,
        title: title === undefined ? existingEmployee.title : title,
        timeZone: timeZone === undefined ? existingEmployee.timeZone : timeZone,
        workEmailAddress: workEmailAddress === undefined ? existingEmployee.workEmailAddress : workEmailAddress,
        workPhone: workPhone === undefined ? existingEmployee.workPhone : workPhone,
        workMobilePhone: workMobilePhone === undefined ? existingEmployee.workMobilePhone : workMobilePhone,
        fax: fax === undefined ? existingEmployee.fax : fax,
        manager: managerId,
        managerName: managerName,
        subordinates: subordinateIds,
        subordinateNames: subordinateNames,
        location: locationId,
        locationName: locationName,
        department: departmentIds,
        departmentNames: departmentNames,
        employeeStatus: employeeStatus === undefined ? existingEmployee.employeeStatus : employeeStatus,
        streetAddress1: streetAddress1 === undefined ? existingEmployee.streetAddress1 : streetAddress1,
        streetAddress2: streetAddress2 === undefined ? existingEmployee.streetAddress2 : streetAddress2,
        city: city === undefined ? existingEmployee.city : city,
        zipPostalCode: zipPostalCode === undefined ? existingEmployee.zipPostalCode : zipPostalCode,
        stateProvince: stateProvince === undefined ? existingEmployee.stateProvince : stateProvince,
        country: country === undefined ? existingEmployee.country : country,
        homePhoneNumber: homePhoneNumber === undefined ? existingEmployee.homePhoneNumber : homePhoneNumber,
        personalMobilePhone: personalMobilePhone === undefined ? existingEmployee.personalMobilePhone : personalMobilePhone,
        personalEmailAddress: personalEmailAddress === undefined ? existingEmployee.personalEmailAddress : personalEmailAddress,
        
    };

    // Update the employee
    const updatedEmployee = await Employee.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
    ).populate([
        { path: 'manager', select: 'firstName lastName employeeID' },
        { path: 'subordinates', select: 'firstName lastName employeeID' },
        { path: 'department', select: 'businessEntity businessEntityType businessEntityId' },
        { path: 'location', select: 'locationName locationId' }
    ]);

    return res.status(200).json(
        new ApiResponse(200, updatedEmployee, "Employee updated successfully!")
    );
});

// Delete an employee by ID
const deleteEmployee = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const employeeToDelete = await Employee.findById(id);
    if (!employeeToDelete) {
        throw new ApiError(404, "Employee not found");
    }

    await Employee.findByIdAndDelete(id);

    return res.status(200).json(
        new ApiResponse(200, {}, "Employee Deleted Successfully!")
    );
});

export {
    createEmployee,
    getEmployee,
    getAllEmployees,
    updateEmployee,
    deleteEmployee
};
