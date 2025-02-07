import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
  createClientContact,
  updateClientContact,
  deleteClientContact,
  getClientContact,
  getAllClientContact,
} from '../controllers/clientContacts.controller.js';

const router = Router();

// Protect all routes
router.use(verifyJWT);

router.route('/create').post(createClientContact);

router.route('/all').get(getAllClientContact);

router
  .route('/:id')
  .get(getClientContact)
  .patch(updateClientContact)
  .delete(deleteClientContact);

export default router;
