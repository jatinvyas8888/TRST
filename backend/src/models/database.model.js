// backend/src/models/database.model.js
import mongoose from 'mongoose';

const databaseSchema = new mongoose.Schema(
  {
    // Database information
    databaseId: {
      type: String,
    },
    databaseName: {
      type: String,
      required: true,
    },
    databaseVersion: {
      type: String,
    },
    databaseOwner:
      [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default:null,
      }],
    databaseDescription: {
      type: String,
    },
    endPointAddress: {
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
      default:null
    },
    // Dependencies
    applications: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
      default:null,
    }],
    hardware: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hardware',
      default:null,
    }],
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default:null,
    },
  },
  { timestamps: true }
);

const Database = mongoose.model('Database', databaseSchema);
export default Database;