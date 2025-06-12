import mongoose from 'mongoose';

const riskAssessmentSchema = new mongoose.Schema({
  riskThreatAssessment: { type: String, required: true },
  editors: { type: String, required: true },
  assessmentDate: { type: Date, required: true },
  facilitator: { type: String, required: true },
  locations: { type: String, required: true },
  respondents: { type: String, required: true },
}, { timestamps: true });

const RiskAssessment = mongoose.model('RiskAssessment', riskAssessmentSchema);

export default RiskAssessment;