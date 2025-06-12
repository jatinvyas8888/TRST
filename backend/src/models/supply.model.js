import mongoose from 'mongoose';

const supplySchema = new mongoose.Schema(
  {
    supplyName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    vendors: {
      type: String,
    },
   
  },
  { timestamps: true }
);

export default mongoose.model('Supply', supplySchema)