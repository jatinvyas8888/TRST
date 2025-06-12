import mongoose from 'mongoose';

const exerciseIssueSchema = new mongoose.Schema({
  exerciseIssue: { type: String, required: true },
  owners: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

const ExerciseIssue = mongoose.model('ExerciseIssue', exerciseIssueSchema);

export default ExerciseIssue;