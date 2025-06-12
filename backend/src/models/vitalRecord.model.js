import mongoose from 'mongoose';

const vitalRecordSchema = new mongoose.Schema({
  vitalRecordName: {
    type: String,
    required: true,
  },
  vitalRecordType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  owners: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  }],
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

const VitalRecord = mongoose.model('VitalRecord', vitalRecordSchema);

export default VitalRecord;
