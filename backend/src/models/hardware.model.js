// backend/src/models/hardware.model.js
import mongoose from 'mongoose';

const hardwareSchema = new mongoose.Schema(
  {
    hardwareId: {
      type: String,
      required: true, // Make this required if necessary
    },
    hardwareName: {
      type: String,
      required: true,
    },
    hardwareType: {
      type: String,
      enum: ['Cluster', 'Database Instance', 'Infrastructure', 'Network', 'Server', 'Other'],
    },
    serialNumber: {
      type: String, // Corrected from 'string' to 'String'
    },
    model: {
      type: String,
    },
    operatingSystem: {
      type: String,
    },
    memoryGB: {
      type: Number,
    },
    location: {
      type: String,
    },
    lowestApplicationRTO: {
      type: String,
    },
    description: {
      type: String,
    },
    parentHardware: {
      type: String,
    },
    childHardware: {
      type: String,
    },
    vendor: {
      type: String,
    },
    warrantyExpiration: {
      type: Date,
    },
    cost: {
      type: Number,
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Export the Hardware model
export default mongoose.model('Hardware', hardwareSchema);