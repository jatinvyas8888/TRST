import express from 'express';
import {
  createExercise,
  getExercises,
  getExerciseById,
  updateExercise,
  deleteExercise,
} from '../controllers/exercise.controller.js';

const router = express.Router();

router.post('/create', createExercise);
router.get('/', getExercises);
router.get('/getbyid/:id', getExerciseById);
router.put('/update/:id', updateExercise);
router.delete('/delete/:id', deleteExercise);

export default router;