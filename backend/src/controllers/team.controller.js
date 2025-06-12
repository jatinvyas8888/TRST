import Team from '../models/team.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

// Create a new Team
const createTeam = asyncHandler(async (req, res) => {
  const { plan, applications, team, teamDescription, teamType, teamMembers } = req.body;

  if (!plan || !team || !teamDescription || !teamType) {
    throw new ApiError(400, "Missing required fields!");
  }

  const newTeam = await Team.create({
    plan,
    applications,
    team,
    teamDescription,
    teamType,
    teamMembers,
  });

  const populatedTeam = await Team.findById(newTeam._id)
    .populate('plan', 'name')
    .populate('applications', 'name')
    .populate('teamMembers', 'firstName lastName');

  return res.status(201).json(new ApiResponse(201, populatedTeam, "Team created successfully"));
});

// Get all teams
const getAllTeams = asyncHandler(async (req, res) => {
  const teams = await Team.find()
    .populate("plan", "name")
    .populate("applications", "applicationName")
    .populate("teamMembers", "firstName lastName");

  // Log response before sending it
  console.log("Fetched Teams from DB:", teams);

  return res.status(200).json({
    statusCode: 200,
    data: teams, // Ensure `data` is always included
    message: "Teams fetched successfully",
    success: true
  });
});


// Get a team by ID
const getTeamById = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id)
    .populate('plan', 'name')
    .populate('applications', 'name')
    .populate('teamMembers', 'firstName lastName');
  if (!team) {
    throw new ApiError(404, "Team not found");
  }
  return res.status(200).json(new ApiResponse(200, team, "Team fetched successfully"));
});

// Update a team
const updateTeam = asyncHandler(async (req, res) => {
  const { plan, applications, team, teamDescription, teamType, teamMembers } = req.body;

  const updatedTeam = await Team.findByIdAndUpdate(
    req.params.id,
    { plan, applications, team, teamDescription, teamType, teamMembers },
    { new: true }
  )
    .populate('plan', 'name')
    .populate('applications', 'name')
    .populate('teamMembers', 'firstName lastName');

  if (!updatedTeam) {
    throw new ApiError(404, "Team not found");
  }

  return res.status(200).json(new ApiResponse(200, updatedTeam, "Team updated successfully"));
});

// Delete a team
const deleteTeam = asyncHandler(async (req, res) => {
  const deletedTeam = await Team.findByIdAndDelete(req.params.id);
  if (!deletedTeam) {
    throw new ApiError(404, "Team not found");
  }
  return res.status(200).json(new ApiResponse(200, null, "Team deleted successfully"));
});

export { createTeam, getAllTeams, getTeamById, updateTeam, deleteTeam };