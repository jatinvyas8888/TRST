import express from 'express';
import { createExerciseIssue, getExerciseIssues } from '../controllers/exerciseIssue.controller.js';

const router = express.Router();

router.post('/create', createExerciseIssue);
router.get('/', getExerciseIssues);

export default router;