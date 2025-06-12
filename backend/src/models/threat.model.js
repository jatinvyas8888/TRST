import mongoose from 'mongoose';

const threatSchema = new mongoose.Schema({
  threat: { type: String, required: true },
  threatType: { type: String, enum: ['Man-Made', 'Natural', 'Political', 'Technology/Infrastructure'], required: true },
  weight: { type: Number, min: 1.0, max: 5.0, required: true },
  likelihood: { type: String, enum: ['High', 'Moderate', 'Low', 'Very Low', 'Not Applicable'], required: true },
  impact: { type: String, enum: ['Catastrophic', 'Significant', 'Moderate', 'Minor', 'No Impact'], required: true },
  mitigatingControls: { type: String, enum: ['Complete', 'Nearly Complete', 'Significant', 'Moderate', 'Minor', 'None'], required: true },
  controlDescription: { type: String, required: true },
}, { timestamps: true });

const Threat = mongoose.model('Threat', threatSchema);

export default Threat;