import express from 'express';
import { createVitalRecord, getAllVitalRecords } from '../controllers/vitalRecord.controller.js';

const router = express.Router();

// Route to create a new vital record
router.post('/create', createVitalRecord);

// Route to get all vital records
router.get('/', getAllVitalRecords);

export default router;