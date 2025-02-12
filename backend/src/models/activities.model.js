import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    bia: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BIA',
    },
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plan',
    },
    activity: {
      type: String,
    },
    outlineTheActivitySteps: {
      type: String,
    },
    businessEntity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BusinessEntity',
    },
    processEditor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProcessEditor',
    },
    rto: {
      type: String,
    },
    activityMTPD: {
      type: String,
    },
    activityRTO: {
      type: String,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Activities = mongoose.model('Activities', activitySchema);

export default Activities;
