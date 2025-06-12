import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  bia: { type: String, required: true },
  plan: { type: String, required: true },
  activity: { type: String, required: true },
  outlineSteps: { type: String, required: true },
  businessEntity: { type: String, required: true },
  processEditor: { type: String, required: true },
  rto: { type: String, enum: ['15 Mins', '1 Hour', '0.5 Hours', '2 Hrs', '3 Hrs'], required: true },
  activityMtpd: { type: String, enum: ['2 Hrs', '4 Hrs', '8 Hrs', '12 Hrs'], required: true },
  activityRto: { type: String, enum: ['2 Hrs', '4 Hrs', '8 Hrs', '12 Hrs'], required: true },
}, { timestamps: true });

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;
