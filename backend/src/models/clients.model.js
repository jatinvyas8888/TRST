import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema(
  {
    //client information
    company: {
      type: String,
      trim: true
    },
    website: {
      type: String,
      trim: true
    },
    mainPhone: {
      type: String,
      trim: true
    },
    fax: {
      type: String,
      trim: true
    },
    //Adreess Details
    address1: {
      type: String,
      trim: true
    },
    address2: {
      type: String,
      trim: true
    },
    city: {
      type: String,
      trim: true
    },
    stateProvince: {
      type: String,
      trim: true
    },
    country: {
      type: String,
      trim: true
    },
    zipCode: {
      type: String,
      trim: true
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
  },
  { timestamps: true }
);

const Client = mongoose.model('Client', clientSchema);

export default Client;
