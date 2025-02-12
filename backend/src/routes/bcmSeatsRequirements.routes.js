import express from 'express';
import {
  createBCMSeatsRequirement,
  getAllBCMSeatsRequirements,
  getBCMSeatsRequirement,
  updateBCMSeatsRequirement,
  deleteBCMSeatsRequirement,
} from '../controllers/bcmSeatsRequirements.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Apply JWT verification middleware to all routes
router.use(verifyJWT);

// Create a new BCM Seats Requirement
router.post('/create', createBCMSeatsRequirement);

// Get all BCM Seats Requirements
router.get('/all', getAllBCMSeatsRequirements);

// Get a single BCM Seats Requirement
router
  .get('/:id', getBCMSeatsRequirement)
  .patch('/:id', updateBCMSeatsRequirement)
  .delete('/:id', deleteBCMSeatsRequirement);

export default router;
