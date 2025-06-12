import express from 'express';
import {
  createPlanApprovalGroup,
  getPlanApprovalGroups,
  getPlanApprovalGroupById,
  updatePlanApprovalGroup,
  deletePlanApprovalGroup,
} from '../controllers/planApprovalGroup.controller.js';

const router = express.Router();

// Routes for plan approval group
router.post('/create', createPlanApprovalGroup); // Create a new plan approval group
router.get('/', getPlanApprovalGroups); // Get all plan approval groups
router.get('/:id', getPlanApprovalGroupById); // Get a single plan approval group by ID
router.put('/:id', updatePlanApprovalGroup); // Update a plan approval group by ID
router.delete('/:id', deletePlanApprovalGroup); // Delete a plan approval group by ID

export default router;