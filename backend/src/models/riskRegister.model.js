import mongoose from 'mongoose';

const riskRegisterSchema = new mongoose.Schema({
  riskName: { type: String, required: true },
  riskType: { type: String, enum: ['Active Shooter', 'Aircraft / Airport Accident', 'Arson', 'Avalanche', 'Bomb Threat / Warning'], required: true },
  riskOwners: { type: String, required: true },
  description: { type: String, required: true },
  financialImpact: { type: Number, required: true },
  actualClosureDate: { type: Date, required: true },
  likelihood: { type: String, enum: ['High', 'Moderate', 'Low', 'Very Low'], required: true },
  impact: { type: String, enum: ['Catastrophic', 'Significant', 'Moderate', 'Minor', 'No Impact'], required: true },
  processes: { type: String, required: true },
  hardware: { type: String, required: true },
  applications: { type: String, required: true },
  vendors: { type: String, required: true },
}, { timestamps: true });

const RiskRegister = mongoose.model('RiskRegister', riskRegisterSchema);

export default RiskRegister;