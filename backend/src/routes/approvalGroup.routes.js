import express from 'express';
import {
  createApprovalGroup,
  getApprovalGroups,
  getApprovalGroupById,
  updateApprovalGroup,
  deleteApprovalGroup,
} from '../controllers/approvalGroup.controller.js';

const router = express.Router();

router.post('/create', createApprovalGroup);
router.get('/', getApprovalGroups);
router.get('/getid/:id', getApprovalGroupById);
router.put('/update/:id', updateApprovalGroup);
router.delete('/delete/:id', deleteApprovalGroup);

export default router;