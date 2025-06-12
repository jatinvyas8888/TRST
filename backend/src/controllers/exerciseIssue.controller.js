import ExerciseIssue from '../models/exerciseIssue.model.js';

export const createExerciseIssue = async (req, res) => {
  try {
    const exerciseIssue = new ExerciseIssue(req.body);
    await exerciseIssue.save();
    res.status(201).json({ data: [exerciseIssue] }); // response मध्ये "data" key मध्ये array
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const getExerciseIssues = async (req, res) => {
  try {
    const exerciseIssues = await ExerciseIssue.find();

    res.status(200).json({ data: exerciseIssues.length > 0 ? exerciseIssues : [] }); 
  } catch (error) {
    console.error("Error fetching Exercise Issues:", error);
    res.status(500).json({ error: error.message });
  }
};