import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  vendor: { type: String, required: true },
  mainPhone: { type: String, required: true },
  faxNumber: { type: String, required: true },
  website: { type: String, required: true },
  criticality: { type: String, enum: ['Critical', 'High', 'Medium', 'Low', 'Not Applicable'], required: true },
  vendorManagementContacts: { type: String, required: true },
  serviceTypes: { type: String, required: true },
  address1: { type: String, required: true },
  address2: { type: String },
  stateProvince: { type: String, required: true },
  country: { type: String, required: true },
  notes: { type: String }
}, { timestamps: true });

const Vendor = mongoose.model('Vendor', vendorSchema);

export default Vendor;