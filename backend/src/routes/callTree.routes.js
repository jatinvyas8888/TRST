import express from 'express';
import {
  createCallTree,
  getAllCallTrees,
  getCallTreeById,
  updateCallTree,
  deleteCallTree,
} from '../controllers/callTree.controller.js';

const router = express.Router();

// Create a new CallTree
router.post('/create', createCallTree);

// Get all CallTrees
router.get('/getall', getAllCallTrees);

// Get a single CallTree by ID
router.get('/:id', getCallTreeById);

// // Update a CallTree by ID
router.put('/edit/:id', updateCallTree);

// // Delete a CallTree by ID
router.delete('/:id', deleteCallTree);

export default router;