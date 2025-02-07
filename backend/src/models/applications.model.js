import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    //application information
    applicationID: {
      type: String,
    },
    applicationName: {
      type: String,
      required: true,
    },
    applicationType: {
      type: String,
    },
    applicationAlias: {
      type: String,
    },
    applicationDescription: {
      type: String,
    },
    applicationURL: {
      type: String,
    },
    applicationType: {
      type: String,
    },
    hostedType: {
      type: String,
    },
    //application contacts
    applicationOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
    },
    applicationVendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
    },
    businessOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
    },
    businessEntity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
    },
    //recovery objectives & capability
    rto: {
      type: String,
    },
    rpo: {
      type: String,
    },
    drStrategy: {
      type: String,
    },
    //location
    primaryDataCenter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
    },
    alternate_FailoverDataCenter: {
      type: String,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);
export const Application = mongoose.model('Application', applicationSchema);
