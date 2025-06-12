import express from 'express';
import {
  createBIADashboard,
  getBIADashboards,
  getBIADashboardById,
  updateBIADashboard,
  deleteBIADashboard,
} from '../controllers/biaDashboard.controller.js';

const router = express.Router();

router.post('/create', createBIADashboard);
router.get('/', getBIADashboards);
router.get('/getbyid/:id', getBIADashboardById);
router.put('/update/:id', updateBIADashboard);
router.delete('/delete/:id', deleteBIADashboard);

export default router;