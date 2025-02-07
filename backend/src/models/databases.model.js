import mongoose from 'mongoose';

const databaseSchema = new mongoose.Schema(
  {
    //database information
    databaseId: {
      type: String,
    },
    databaseName: {
      type: String,
      required: true,
    },
    databaseVesion: {
      type: String,
    },
    databaseOwner: {
      type: String,
    },
    databaseIdDescription: {
      type: String,
    },
    EndPointAddress: {
      type: String,
    },
    databaseType: {
      type: String,
    },
    drStrategy: {
      type: String,
    },
    hostedType: {
      type: String,
    },
    rto: {
      type: String,
    },
    //dependencies
    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
    },
    hardware: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hardware',
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);
export default mongoose.model('Database', databaseSchema);
