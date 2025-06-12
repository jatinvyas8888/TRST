import BCMSeatsRequirements from '../models/bcmSeatsRequirements.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

//models
import Location from '../models/locations.model.js';
import Activities from '../models/activities.model.js';
import Employee from '../models/employees.model.js';
import { User } from '../models/user.model.js';

// ✅ Create a new BCM Seats Requirement
const createBCMSeatsRequirement = asyncHandler(async (req, res) => {
  const {
    bcmSeatsRequirements,
    bcmSeatsRequirementsRecovery,
    activities,
    timeOfOperation, // Updated field name to match frontend
    bcmSeatNumber,
    bcmSite, // Ensure this matches the frontend
    primaryCriticalStaff,
    alternateCriticalStaff,
  } = req.body;

  // ✅ Ensure required fields are provided
  if (!bcmSeatsRequirements || !timeOfOperation || !bcmSeatNumber || !bcmSite) {
    throw new ApiError(400, "Missing required fields!");
  }

  // ✅ Validate `req.user`
  if (!req.user || !req.user._id) {
    throw new ApiError(401, "Unauthorized! User not found.");
  }

  // ✅ Fetch related data efficiently
  const [existingLocation, existingActivities, existingPrimaryCriticalStaff, existingAlternateCriticalStaff] =
    await Promise.all([
      bcmSite ? Location.findOne({ $or: [{ _id: bcmSite }, { locationName: bcmSite }] }) : null,
      activities ? Activities.find({ _id: { $in: activities } }) : null,
      primaryCriticalStaff ? Employee.find({ _id: { $in: primaryCriticalStaff } }) : null,
      alternateCriticalStaff ? Employee.find({ _id: { $in: alternateCriticalStaff } }) : null
    ]);

  // ✅ Check if references exist
  if (!existingLocation) throw new ApiError(404, "Location not found!");
  if (!existingActivities || existingActivities.length !== activities.length) throw new ApiError(404, "Some activities not found!");
  if (!existingPrimaryCriticalStaff || existingPrimaryCriticalStaff.length !== primaryCriticalStaff.length) throw new ApiError(404, "Some primary critical staff not found!");
  if (!existingAlternateCriticalStaff || existingAlternateCriticalStaff.length !== alternateCriticalStaff.length) throw new ApiError(404, "Some alternate critical staff not found!");

  // ✅ Create a new BCM Seats Requirement entry
  const newRequirement = await BCMSeatsRequirements.create({
    bcmSeatsRequirements,
    bcmSeatsRequirementsRecovery,
    activities: existingActivities.map(activity => activity._id),
    timeOfOperation, // Updated field name to match frontend
    bcmSeatNumber,
    bcmSite: existingLocation._id, // Ensure this matches the frontend
    primaryCriticalStaff: existingPrimaryCriticalStaff.map(staff => staff._id),
    alternateCriticalStaff: existingAlternateCriticalStaff.map(staff => staff._id),
    updatedBy: req.user._id,
  });

  // ✅ Populate related data
  const populatedRequirement = await BCMSeatsRequirements.findById(newRequirement._id)
    .populate('activities', 'name')
    .populate('bcmSite', 'locationName')
    .populate('primaryCriticalStaff', 'firstName middleName lastName')
    .populate('alternateCriticalStaff', 'firstName middleName lastName')
    .populate('updatedBy', 'username');

  return res.status(201).json(new ApiResponse(201, populatedRequirement, "BCM Seats Requirement created successfully"));
});
//get all
const getAllBCMSeatsRequirements = asyncHandler(async (req, res) => {
  const requirements = await BCMSeatsRequirements.find()
    .populate("activities", "bia")  // Fetch activity names
    .populate("bcmSite", "locationName")
    .populate("primaryCriticalStaff", "firstName lastName")
    .populate("alternateCriticalStaff", "firstName lastName")
    .populate("updatedBy", "username");

  return res.status(200).json(new ApiResponse(200, requirements, "BCM Seats Requirements retrieved successfully"));
});


// ✅ Update a BCM Seats Requirement by ID
const updateBCMSeatsRequirement = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    bcmSeatsRequirements,
    bcmSeatsRequirementsRecovery,
    activities,
    timeOfOperation,
    bcmSeatNumber,
    bcmSite,
    primaryCriticalStaff,
    alternateCriticalStaff,
  } = req.body;

  // ✅ Check if record exists
  let existingRequirement = await BCMSeatsRequirements.findById(id);
  if (!existingRequirement) {
    throw new ApiError(404, "BCM Seats Requirement not found.");
  }

  // ✅ Validate related entities
  const [existingLocation, existingActivities, existingPrimaryCriticalStaff, existingAlternateCriticalStaff] =
    await Promise.all([
      bcmSite ? Location.findById(bcmSite) : null,
      activities ? Activities.find({ _id: { $in: activities } }) : null,
      primaryCriticalStaff ? Employee.find({ _id: { $in: primaryCriticalStaff } }) : null,
      alternateCriticalStaff ? Employee.find({ _id: { $in: alternateCriticalStaff } }) : null
    ]);

  if (bcmSite && !existingLocation) throw new ApiError(404, "Location not found!");
  if (activities && existingActivities.length !== activities.length) throw new ApiError(404, "Some activities not found!");
  if (primaryCriticalStaff && existingPrimaryCriticalStaff.length !== primaryCriticalStaff.length) throw new ApiError(404, "Some primary staff not found!");
  if (alternateCriticalStaff && existingAlternateCriticalStaff.length !== alternateCriticalStaff.length) throw new ApiError(404, "Some alternate staff not found!");

  // ✅ Update fields
  existingRequirement.bcmSeatsRequirements = bcmSeatsRequirements || existingRequirement.bcmSeatsRequirements;
  existingRequirement.bcmSeatsRequirementsRecovery = bcmSeatsRequirementsRecovery || existingRequirement.bcmSeatsRequirementsRecovery;
  existingRequirement.timeOfOperation = timeOfOperation || existingRequirement.timeOfOperation;
  existingRequirement.bcmSeatNumber = bcmSeatNumber || existingRequirement.bcmSeatNumber;
  existingRequirement.bcmSite = bcmSite ? existingLocation._id : existingRequirement.bcmSite;
  existingRequirement.activities = activities ? existingActivities.map(a => a._id) : existingRequirement.activities;
  existingRequirement.primaryCriticalStaff = primaryCriticalStaff ? existingPrimaryCriticalStaff.map(s => s._id) : existingRequirement.primaryCriticalStaff;
  existingRequirement.alternateCriticalStaff = alternateCriticalStaff ? existingAlternateCriticalStaff.map(s => s._id) : existingRequirement.alternateCriticalStaff;
  existingRequirement.updatedBy = req.user._id;

  await existingRequirement.save();

  // ✅ Populate updated data
  const updatedRequirement = await BCMSeatsRequirements.findById(id)
    .populate('activities', 'name')
    .populate('bcmSite', 'locationName')
    .populate('primaryCriticalStaff', 'firstName lastName')
    .populate('alternateCriticalStaff', 'firstName lastName')
    .populate('updatedBy', 'username');

  return res.status(200).json(new ApiResponse(200, updatedRequirement, "BCM Seats Requirement updated successfully"));
});




// ✅ Get a BCM Seats Requirement by ID
const getBCMSeatsRequirementById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const requirement = await BCMSeatsRequirements.findById(id)
    .populate("activities", "bia")
    .populate("bcmSite", "locationName")
    .populate("primaryCriticalStaff", "firstName lastName")
    .populate("alternateCriticalStaff", "firstName lastName")
    .populate("updatedBy", "username");

  if (!requirement) {
    throw new ApiError(404, "BCM Seats Requirement not found.");
  }

  return res.status(200).json(new ApiResponse(200, requirement, "BCM Seats Requirement retrieved successfully"));
});


// ✅ Delete a specific BCM Seats Requirement by ID
const deleteBCMSeatsRequirement = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // ✅ Check if the ID exists in the database
  const requirement = await BCMSeatsRequirements.findById(id);
  if (!requirement) {
    throw new ApiError(404, "BCM Seats Requirement not found!");
  }

  // ✅ Delete the record
  await BCMSeatsRequirements.findByIdAndDelete(id);

  return res.status(200).json(new ApiResponse(200, null, "BCM Seats Requirement deleted successfully"));
});

export {
  createBCMSeatsRequirement,
  getAllBCMSeatsRequirements,
  updateBCMSeatsRequirement,
  getBCMSeatsRequirementById,
  deleteBCMSeatsRequirement
};