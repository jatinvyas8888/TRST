// backend/src/routes/application.routes.js
import express from 'express';
import {
    createApplication,
    getAllApplications,
    getApplicationById,
    updateApplication,
    deleteApplication,
} from '../controllers/application.controller.js';

const router = express.Router();

// Define routes
router.post('/create', createApplication); // Create a new application
router.get('/getall', getAllApplications); // Get all applications
router.get('/:id', getApplicationById); // Get application by ID
router.put('/:id', updateApplication); // Update application
router.delete('/:id', deleteApplication); // Delete application

export default router;
