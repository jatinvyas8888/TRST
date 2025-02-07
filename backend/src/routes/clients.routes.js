import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
  createClient,
  updateClient,
  deleteClient,
  getClient,
  getAllClients,
} from '../controllers/clients.controller.js';

const router = Router();

// All routes should be protected
router.use(verifyJWT);

router.route('/create').post(createClient);

router.route('/all').get(getAllClients);

router
  .route('/:id')
  .get(getClient)
  .patch(updateClient)
  .delete(deleteClient);

export default router;
