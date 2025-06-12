import express from 'express';
import { createTeam, getAllTeams, getTeamById, updateTeam, deleteTeam } from '../controllers/team.controller.js';

const router = express.Router();

router.post('/create', createTeam); // Create a team
router.get('/all', getAllTeams); // Get all teams
router.get('/:id', getTeamById); // Get a team by ID
router.put('/:id', updateTeam); // Update a team
router.delete('/:id', deleteTeam); // Delete a team

export default router;