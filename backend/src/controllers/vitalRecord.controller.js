import VitalRecord from '../models/vitalRecord.model.js';

// Create a new vital record
export const createVitalRecord = async (req, res) => {
  try {
    const newVitalRecord = new VitalRecord(req.body);
    const savedVitalRecord = await newVitalRecord.save();
    res.status(201).json(savedVitalRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all vital records
// export const getAllVitalRecords = async (req, res) => {
//   try {
//     const vitalRecords = await VitalRecord.find();
//     res.status(200).json(vitalRecords);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }

  // const VitalRecord = require('../models/vitalRecord.model');

// Fetch all vital records with owner details populated
export const getAllVitalRecords = async (req, res) => {
  try {
    const vitalRecords = await VitalRecord.find().populate('owners', 'firstName lastName');
    res.status(200).json(vitalRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
