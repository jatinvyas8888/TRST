import express from 'express';
import { 
    createServiceType, 
    getAllServiceTypes, 
    getServiceTypeById, 
    updateServiceType, 
    deleteServiceType 
} from '../controllers/serviceType.controller.js';

const router = express.Router();

router.post('/create', createServiceType);
router.get('/all', getAllServiceTypes);
router.get('/:id', getServiceTypeById);
router.patch('/:id', updateServiceType);
router.delete('/:id', deleteServiceType);

export default router;