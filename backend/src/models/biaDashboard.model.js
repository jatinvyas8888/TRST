import mongoose from 'mongoose';

const biaDashboardSchema = new mongoose.Schema({
  department: { type: String, required: true },
  biaEditor: { type: String, required: true },
  division: { type: String, required: true },
  approvalGroup: { type: String, required: true },
  group: { type: String, required: true },
  respondents: { type: String, required: true },
  generalManager: { type: String, required: true },
  bcmChampionPrimary: { type: String, required: true },
  bcmChampionSecondary: { type: String, required: true },
  normalWorkingHours: { type: String, required: true },
  workBacklog: { type: String, enum: ['Yes', 'No'], required: true },
  financialImpact24H: { type: String, enum: ['NA', 'Negligible impact', 'Minor impact', 'Moderate impact', 'Material Impact', 'Enormous Impact'], required: true },
  financialImpact1D24H: { type: String, enum: ['NA', 'Negligible impact', 'Minor impact', 'Moderate impact', 'Material Impact', 'Enormous Impact'], required: true },
  financialImpact2D: { type: String, enum: ['NA', 'Negligible impact', 'Minor impact', 'Moderate impact', 'Material Impact', 'Enormous Impact'], required: true },
  financialImpact3D: { type: String, enum: ['NA', 'Negligible impact', 'Minor impact', 'Moderate impact', 'Material Impact', 'Enormous Impact'], required: true },
  financialImpact1W: { type: String, enum: ['NA', 'Negligible impact', 'Minor impact', 'Moderate impact', 'Material Impact', 'Enormous Impact'], required: true },
  regulatoryImpact2D: { type: String, enum: ['NA', 'Negligible impact', 'Minor impact', 'Moderate impact', 'Material Impact', 'Enormous Impact'], required: true },
  regulatoryImpact3D: { type: String, enum: ['NA', 'Negligible impact', 'Minor impact', 'Moderate impact', 'Material Impact', 'Enormous Impact'], required: true },
  regulatoryImpact1W: { type: String, enum: ['NA', 'Negligible impact', 'Minor impact', 'Moderate impact', 'Material Impact', 'Enormous Impact'], required: true },
  reputationalImpact02H: { type: String, enum: ['NA', 'Negligible impact', 'Minor impact', 'Moderate impact', 'Material Impact', 'Enormous Impact'], required: true },
  reputationalImpact24H: { type: String, enum: ['NA', 'Negligible impact', 'Minor impact', 'Moderate impact', 'Material Impact', 'Enormous Impact'], required: true },
  reputationalImpact1W: { type: String, enum: ['NA', 'Negligible impact', 'Minor impact', 'Moderate impact', 'Material Impact', 'Enormous Impact'], required: true },
  reputationalImpact1D24H: { type: String, enum: ['NA', 'Negligible impact', 'Minor impact', 'Moderate impact', 'Material Impact', 'Enormous Impact'], required: true },
  reputationalImpact2D: { type: String, enum: ['NA', 'Negligible impact', 'Minor impact', 'Moderate impact', 'Material Impact', 'Enormous Impact'], required: true },
  reputationalImpact3D: { type: String, enum: ['NA', 'Negligible impact', 'Minor impact', 'Moderate impact', 'Material Impact', 'Enormous Impact'], required: true },
  legalImpact02H: { type: String, enum: ['NA', 'Negligible impact', 'Minor impact', 'Moderate impact', 'Material Impact', 'Enormous Impact'], required: true },
  legalImpact24H: { type: String, enum: ['NA', 'Negligible impact', 'Minor impact', 'Moderate impact', 'Material Impact', 'Enormous Impact'], required: true },
  legalImpact1D24H: { type: String, enum: ['NA', 'Negligible impact', 'Minor impact', 'Moderate impact', 'Material Impact', 'Enormous Impact'], required: true },
  legalImpact2D: { type: String, enum: ['NA', 'Negligible impact', 'Minor impact', 'Moderate impact', 'Material Impact', 'Enormous Impact'], required: true },
  legalImpact3D: { type: String, enum: ['NA', 'Negligible impact', 'Minor impact', 'Moderate impact', 'Material Impact', 'Enormous Impact'], required: true },
  legalImpact1W: { type: String, enum: ['NA', 'Negligible impact', 'Minor impact', 'Moderate impact', 'Material Impact', 'Enormous Impact'], required: true },
}, { timestamps: true });

const BIADashboard = mongoose.model('BIADashboard', biaDashboardSchema);

export default BIADashboard;