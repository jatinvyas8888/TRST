import mongoose from 'mongoose';

const equipmentSchema = new mongoose.Schema(
  {
    equipment: {
      type: String,
      required: true,
      trim: true,
    },
    equipmentType: {
      type: String,
      enum: ['Yes', 'No'], // Dropdown options
      required: true,
    },
    modelName: {
      type: String,
      required: true,
      trim: true,
    },
    vendors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor', // Must match the Vendor model name
      },
    ],
    description: {
      type: String,
      required: true,
      trim: true,
    },
    biaEquipmentDependency: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Equipment = mongoose.model('Equipment', equipmentSchema);

export default Equipment;
