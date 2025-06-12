import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  exerciseSubject: { type: String, required: true },
  coordinator: { type: String, required: true },
  exerciseType: { type: String, enum: ['Full Scale', 'Functional', 'Location', 'Notification', 'Plan', 'Tabletop', 'Third Party'], required: true },
  startDateTime: { type: Date, required: true },
  businessEntity: { type: String, required: true },
  endDateTime: { type: Date, required: true },
  description: { type: String, required: true },
  successCriteria: { type: String, required: true },
  participants: { type: String, required: true },
  teams: { type: String, required: true },
  processes: { type: String, required: true },
  locations: { type: String, required: true },
  applications: { type: String, required: true },
  vendors: { type: String, required: true },
  plans: { type: String, required: true },
}, { timestamps: true });

const Exercise = mongoose.model('Exercise', exerciseSchema);

export default Exercise;