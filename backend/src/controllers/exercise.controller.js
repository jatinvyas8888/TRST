import Exercise from '../models/exercise.model.js';

// Create a new Exercise entry
export const createExercise = async (req, res) => {
  try {
    const newExercise = new Exercise(req.body);
    await newExercise.save();
    res.status(201).json(newExercise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Exercise entries
export const getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single Exercise entry by ID
export const getExerciseById = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    res.status(200).json(exercise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an Exercise entry by ID
export const updateExercise = async (req, res) => {
  try {
    const updatedExercise = await Exercise.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedExercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    res.status(200).json(updatedExercise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an Exercise entry by ID
export const deleteExercise = async (req, res) => {
  try {
    const deletedExercise = await Exercise.findByIdAndDelete(req.params.id);
    if (!deletedExercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    res.status(200).json({ message: 'Exercise deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};