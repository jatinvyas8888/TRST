import { Router } from 'express';
import { 
    createLocation, 
    getLocationById, 
    getAllLocations, 
    updateLocation, 
    deleteLocation 
} from '../controllers/locations.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

// Create new location
router.route("/create").post(verifyJWT, createLocation);

// Get all locations with filtering and pagination
router.route("/all").get(verifyJWT, getAllLocations);

// Handle operations on specific location by ID
router.route("/:id")
    .get(verifyJWT, getLocationById)      // Get single location
    .patch(verifyJWT, updateLocation)     // Update location
    .delete(verifyJWT, deleteLocation);   // Delete location

export default router; 