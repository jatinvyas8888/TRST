import express from 'express';
import {
  createVendor,
  getAllVendors,
  getVendorById,
  updateVendorById,
  deleteVendorById,
} from '../controllers/vendor.controller.js';

const router = express.Router();

// Create a new vendor
router.post('/create', createVendor);

// Get all vendors
router.get('/', getAllVendors);

// Get a single vendor by ID
router.get('/:id', getVendorById);

// Update a vendor by ID
router.put('/:id', updateVendorById);

// Delete a vendor by ID
router.delete('/:id', deleteVendorById);

export default router;