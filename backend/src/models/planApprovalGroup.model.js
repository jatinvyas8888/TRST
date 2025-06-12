import mongoose from 'mongoose';

const planApprovalGroupSchema = new mongoose.Schema(
  {
    planApprovalGroup: {
      type: String,
      required: true
      
    },
    groupDescription: {
      type: String
      
    },
  },
  { timestamps: true }
);

const PlanApprovalGroup = mongoose.model('PlanApprovalGroup', planApprovalGroupSchema);

export default PlanApprovalGroup;