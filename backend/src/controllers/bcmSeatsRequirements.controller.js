import BCMSeatsRequirements from '../models/bcmSeatsRequirements.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

//models
import Location from '../models/locations.model.js';
import Activities from '../models/activities.model.js';
import Employee from '../models/employees.model.js';
import { User } from '../models/user.model.js';

// Create a new BCM Seats Requirement
const createBCMSeatsRequirement = asyncHandler(async (req, res) => {
  const {
    bcmSeatsRequirements,
    bcmSeatsRequirementsRecovery,
    activities,
    TimeofOperation,
    bcmSeatNumber,
    bcmSite,
    primaryCriticalStaff,
    alternateCriticalStaff,
  } = req.body;

  //check if the location exists by id or name
  let existingLocation;
  if (bcmSite) {
    existingLocation = await Location.findOne({
      $or: [{ _id: bcmSite }, { locationName: bcmSite }],
    });
    if (!existingLocation) {
      throw new ApiError(404, 'Location not found');
    }
  } else {
    existingLocation = null;
  }

  //check if the activities exist by id or name
  let existingActivities;
  if (activities) {
    existingActivities = await Activities.findOne({
      $or: [{ _id: activities }, { name: activities }],
    });
    if (!existingActivities) {
      throw new ApiError(404, 'Activities not found');
    }
  } else {
    existingActivities = null;
  }

  //check if the primary critical staff exists by id or name
  const existingPrimaryCriticalStaff = await Employee.findOne({
    $or: [{ _id: primaryCriticalStaff }, { fullName: primaryCriticalStaff }],
  });
  if (!existingPrimaryCriticalStaff) {
    throw new ApiError(404, 'Primary Critical Staff not found');
  }

  //check if the alternate critical staff exists by id or name
  const existingAlternateCriticalStaff = await Employee.findOne({
    $or: [
      { _id: alternateCriticalStaff },
      { fullName: alternateCriticalStaff },
    ],
  });
  if (!existingAlternateCriticalStaff) {
    throw new ApiError(404, 'Alternate Critical Staff not found');
  }

  //check if the updatedBy exists
  const existingUpdatedBy = await User.findById(req.user._id);
  if (!existingUpdatedBy) {
    throw new ApiError(404, 'Updated By not found');
  }

  const newRequirement = await BCMSeatsRequirements.create({
    bcmSeatsRequirements,
    bcmSeatsRequirementsRecovery,
    activities: existingActivities ? existingActivities._id : null,
    TimeofOperation,
    bcmSeatNumber,
    bcmSite: existingLocation ? existingLocation._id : null,
    primaryCriticalStaff: existingPrimaryCriticalStaff._id,
    alternateCriticalStaff: existingAlternateCriticalStaff._id,
    updatedBy: existingUpdatedBy._id,
  });

  const populatedRequirement = await BCMSeatsRequirements.findById(newRequirement._id)
    .populate('activities', 'name')
    .populate('bcmSite', 'locationName')
    .populate('primaryCriticalStaff', 'firstName middleName lastName')
    .populate('alternateCriticalStaff', 'firstName middleName lastName')
    .populate('updatedBy', 'username');

  return res
    .status(201)
    .json(new ApiResponse(201,populatedRequirement,'BCM Seats Requirement created successfully'));
});

// Get all BCM Seats Requirements
const getAllBCMSeatsRequirements = asyncHandler(async (req, res) => {
  const requirements = await BCMSeatsRequirements.find()
    .populate('activities', 'name')
    .populate('bcmSite', 'locationName')
    .populate('primaryCriticalStaff', 'fullName')
    .populate('alternateCriticalStaff', 'fullName')
    .populate('updatedBy', 'username');

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        requirements,
        'BCM Seats Requirements retrieved successfully'
      )
    );
});

// Get a single BCM Seats Requirement
const getBCMSeatsRequirement = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const requirement = await BCMSeatsRequirements.findById(id)
    .populate('activities', 'name')
    .populate('bcmSite', 'locationName')
    .populate('primaryCriticalStaff', 'firstName middleName lastName')
    .populate('alternateCriticalStaff', 'firstName middleName lastName')
    .populate('updatedBy', 'username');

  if (!requirement) {
    throw new ApiError(404, 'BCM Seats Requirement not found');
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        requirement,
        'BCM Seats Requirement retrieved successfully'
      )
    );
});

// Update a BCM Seats Requirement
const updateBCMSeatsRequirement = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  // Check if requirement exists
  const existingRequirement = await BCMSeatsRequirements.findById(id);
  if (!existingRequirement) {
    throw new ApiError(404, "BCM Seats Requirement not found");
  }

  //check if the location exists by id or name
  let existingLocation;
  if (updateData.bcmSite) {
    existingLocation = await Location.findOne({
      $or: [{ _id: updateData.bcmSite }, { locationName: updateData.bcmSite }],
    });
    if (!existingLocation) {
      throw new ApiError(404, 'Location not found');
    }
  } else {
    existingLocation = null;
  }

  //check if the activities exists by id or name
  let existingActivities;
  if (updateData.activities) {
    existingActivities = await Activities.findOne({
      $or: [{ _id: updateData.activities }, { name: updateData.activities }],
    });
    if (!existingActivities) {
      throw new ApiError(404, 'Activities not found');
    }
  } else {
    existingActivities = null;
  }
  
  //check if the primary critical staff exists by id or name
  const existingPrimaryCriticalStaff = await Employee.findOne({
    $or: [{ _id: updateData.primaryCriticalStaff }, { fullName: updateData.primaryCriticalStaff }],
  });
  if (!existingPrimaryCriticalStaff) {
    throw new ApiError(404, 'Primary Critical Staff not found');
  }

  //check if the alternate critical staff exists by id or name
  const existingAlternateCriticalStaff = await Employee.findOne({
    $or: [{ _id: updateData.alternateCriticalStaff }, { fullName: updateData.alternateCriticalStaff }],
  });
  if (!existingAlternateCriticalStaff) {
    throw new ApiError(404, 'Alternate Critical Staff not found');
  }

  // Update the requirement
  const sanitizedData = {
    bcmSeatsRequirements: updateData.bcmSeatsRequirements || null,
    bcmSeatsRequirementsRecovery: updateData.bcmSeatsRequirementsRecovery || null,
    activities: updateData.activities === "" ? null : updateData.activities,
    TimeofOperation: updateData.TimeofOperation || null,
    bcmSeatNumber: updateData.bcmSeatNumber || null,
    bcmSite: updateData.bcmSite === "" ? null : updateData.bcmSite,
    primaryCriticalStaff: updateData.primaryCriticalStaff === "" ? null : updateData.primaryCriticalStaff,
    alternateCriticalStaff: updateData.alternateCriticalStaff === "" ? null : updateData.alternateCriticalStaff,
  };

  if (sanitizedData.activities) {
    const activityExists = await Activities.findById(sanitizedData.activities);
    if (!activityExists) {
      throw new ApiError(404, "Activities not found");
    }
  }

  if (sanitizedData.bcmSite) {
    const locationExists = await Location.findById(sanitizedData.bcmSite);
    if (!locationExists) {
      throw new ApiError(404, "Location not found");
    }
  }

  if (sanitizedData.primaryCriticalStaff) {
    const primaryStaffExists = await Employee.findById(sanitizedData.primaryCriticalStaff);
    if (!primaryStaffExists) {
      throw new ApiError(404, "Primary Critical Staff not found");
    }
  }

  if (sanitizedData.alternateCriticalStaff) {
    const alternateStaffExists = await Employee.findById(sanitizedData.alternateCriticalStaff);
    if (!alternateStaffExists) {
      throw new ApiError(404, "Alternate Critical Staff not found");
    }
  }

  const updatedRequirement = await BCMSeatsRequirements.findByIdAndUpdate(
    id,
    {   
      $set: {
        ...sanitizedData,
        updatedBy: req.user._id,
      },
    },
    { new: true }
  )
    .populate("activities", "name")
    .populate("bcmSite", "locationName")
    .populate("primaryCriticalStaff", "firstName middleName lastName")
    .populate("alternateCriticalStaff", "firstName middleName lastName")
    .populate("updatedBy", "username");

  if (!updatedRequirement) {
    throw new ApiError(404, "BCM Seats Requirement not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedRequirement, "BCM Seats Requirement updated successfully"));
});

// Delete a BCM Seats Requirement
const deleteBCMSeatsRequirement = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedRequirement = await BCMSeatsRequirements.findByIdAndDelete(id);

  if (!deletedRequirement) {
    throw new ApiError(404, 'BCM Seats Requirement not found');
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, {}, 'BCM Seats Requirement deleted successfully')
    );
});

export {
  createBCMSeatsRequirement,
  getAllBCMSeatsRequirements,
  getBCMSeatsRequirement,
  updateBCMSeatsRequirement,
  deleteBCMSeatsRequirement,
};
