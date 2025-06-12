import express from 'express';
import {
    getAllIncidents,
    createIncident,
    // updateIncident,
    // deleteIncident
} from '../controllers/activeIncident.controller.js'; // Adjust the path as necessary

const router = express.Router();


router.post('/create', createIncident);
router.get('/getall', getAllIncidents);

export default router;