import mongoose from 'mongoose';

const callTreeSchema = new mongoose.Schema({
  callTreeName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  employees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  }],
  clientContacts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClientContacts',
  }],
  vendorContacts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VendorContact',
    default: null,
  }],
}, {
  timestamps: true,
});

const CallTree = mongoose.model('CallTree', callTreeSchema);

export default CallTree;