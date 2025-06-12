import express from 'express';
import {
  createPlan,
  getAllPlans,
  getPlanById,
  updatePlan,
  deletePlanById,
} from '../controllers/plan.controller.js';

const router = express.Router();

router.post('/create', createPlan);
router.get('/all', getAllPlans);
router.get('/:id', getPlanById);
router.put('/update/:id', updatePlan);
router.delete('/delete/:id',  deletePlanById);

export default router;