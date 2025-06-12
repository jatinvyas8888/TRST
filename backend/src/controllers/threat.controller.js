import Threat from '../models/threat.model.js';

// Create a new Threat entry
export const createThreat = async (req, res) => {
  try {
    const newThreat = new Threat(req.body);
    await newThreat.save();
    res.status(201).json(newThreat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Threat entries
export const getThreats = async (req, res) => {
  try {
    const threats = await Threat.find();
    res.status(200).json(threats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single Threat entry by ID
export const getThreatById = async (req, res) => {
  try {
    const threat = await Threat.findById(req.params.id);
    if (!threat) {
      return res.status(404).json({ message: 'Threat not found' });
    }
    res.status(200).json(threat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Threat entry by ID
export const updateThreat = async (req, res) => {
  try {
    const updatedThreat = await Threat.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedThreat) {
      return res.status(404).json({ message: 'Threat not found' });
    }
    res.status(200).json(updatedThreat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a Threat entry by ID
export const deleteThreat = async (req, res) => {
  try {
    const deletedThreat = await Threat.findByIdAndDelete(req.params.id);
    if (!deletedThreat) {
      return res.status(404).json({ message: 'Threat not found' });
    }
    res.status(200).json({ message: 'Threat deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};