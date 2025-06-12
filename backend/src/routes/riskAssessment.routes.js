import express from 'express';
import {
  createRiskAssessment,
  getRiskAssessments,
  getRiskAssessmentById,
  updateRiskAssessment,
  deleteRiskAssessment,
} from '../controllers/riskAssessment.controller.js';

const router = express.Router();

router.post('/create', createRiskAssessment);
router.get('/', getRiskAssessments);
router.get('/getbyid/:id', getRiskAssessmentById);
router.put('/update/:id', updateRiskAssessment);
router.delete('/delete/:id', deleteRiskAssessment);

export default router;