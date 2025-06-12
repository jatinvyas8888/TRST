import express from 'express';
import {
  createRiskRegister,
  getRiskRegisters,
  getRiskRegisterById,
  updateRiskRegister,
  deleteRiskRegister,
} from '../controllers/riskRegister.controller.js';

const router = express.Router();

router.post('/create', createRiskRegister);
router.get('/', getRiskRegisters);
router.get('/getbyid/:id', getRiskRegisterById);
router.put('/update/:id', updateRiskRegister);
router.delete('/delete/:id', deleteRiskRegister);

export default router;