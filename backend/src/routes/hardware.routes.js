// backend/src/routes/hardware.routes.js
import { Router } from 'express';
import {
    createHardware,
    getAllHardware,
} from '../controllers/hardware.controller.js';

const router = Router();

// Route to create a new hardware entry
router.post('/create', createHardware);

// Route to get all hardware entries
router.get('/getall', getAllHardware);

export default router;