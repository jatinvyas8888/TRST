import mongoose from 'mongoose';

const vendorContactSchema = new mongoose.Schema(
  {
    vendor: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    emailAddress: {
      type: String,
      required: true,
    },
    workPhone: {
      type: String,
    },
    workMobilePhone: {
      type: String,
    },
    alternatePhone: {
      type: String,
    },
    fax: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('VendorContact', vendorContactSchema);