import mongoose from 'mongoose';

const approvalGroupSchema = new mongoose.Schema(
  {
    approvalGroup: {
      type: String,
      required: true,
    },
    groupDescription: {
      type: String,
    },
  },
  { timestamps: true }
);

const ApprovalGroup = mongoose.model('ApprovalGroup', approvalGroupSchema);

export default ApprovalGroup;