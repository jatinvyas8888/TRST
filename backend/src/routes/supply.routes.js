import { Router } from 'express';
import { createSupply, getAllSupplies } from '../controllers/supply.controller.js';

const router = Router();

// Route to create a new supply
router.post('/create', createSupply);

// Route to get all supplies
router.get('/getall', getAllSupplies);

export default router;