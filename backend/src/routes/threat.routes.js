import express from 'express';
import {
  createThreat,
  getThreats,
  getThreatById,
  updateThreat,
  deleteThreat,
} from '../controllers/threat.controller.js';

const router = express.Router();

router.post('/create', createThreat);
router.get('/', getThreats);
router.get('/getbyid/:id', getThreatById);
router.put('/update/:id', updateThreat);
router.delete('/delete/:id', deleteThreat);

export default router;