import mongoose from 'mongoose';

const hardwareSchema = new mongoose.Schema(
  {
    //hardware information
    hardwareName: {
      type: String,
      required: true,
    },
    hardwareType: {
      type: String,
      required: true,
    },
    hardwareId: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hardware',
    },
    description: {
      type: String,
    },
    searialNumber: {
      type: String,
    },
    model: {
      type: String,
    },
    opratingSystem: {
      type: String,
    },
    memory: {
      type: String,
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
    },
    lowestApplicationRTO: {
      type: String,
    },
    //hardware dependencies
    parentHardware: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hardware',
    },
    childHardware: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hardware',
    },
    //procument information
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor',
    },
    warrantyExpiration: {
      type: Date,
    },
    cost: {
      type: Number,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);
export default mongoose.model('Hardware', hardwareSchema);
