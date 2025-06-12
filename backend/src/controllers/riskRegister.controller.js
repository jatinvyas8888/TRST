import RiskRegister from '../models/riskRegister.model.js';

// Create a new Risk Register entry
export const createRiskRegister = async (req, res) => {
  try {
    const newRiskRegister = new RiskRegister(req.body);
    await newRiskRegister.save();
    res.status(201).json(newRiskRegister);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Risk Register entries
export const getRiskRegisters = async (req, res) => {
  try {
    const riskRegisters = await RiskRegister.find();
    res.status(200).json(riskRegisters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single Risk Register entry by ID
export const getRiskRegisterById = async (req, res) => {
  try {
    const riskRegister = await RiskRegister.findById(req.params.id);
    if (!riskRegister) {
      return res.status(404).json({ message: 'Risk Register not found' });
    }
    res.status(200).json(riskRegister);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Risk Register entry by ID
export const updateRiskRegister = async (req, res) => {
  try {
    const updatedRiskRegister = await RiskRegister.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRiskRegister) {
      return res.status(404).json({ message: 'Risk Register not found' });
    }
    res.status(200).json(updatedRiskRegister);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a Risk Register entry by ID
export const deleteRiskRegister = async (req, res) => {
  try {
    const deletedRiskRegister = await RiskRegister.findByIdAndDelete(req.params.id);
    if (!deletedRiskRegister) {
      return res.status(404).json({ message: 'Risk Register not found' });
    }
    res.status(200).json({ message: 'Risk Register deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};