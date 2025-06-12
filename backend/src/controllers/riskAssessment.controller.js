import RiskAssessment from '../models/riskAssessment.model.js';

// Create a new Risk Assessment entry
export const createRiskAssessment = async (req, res) => {
  try {
    const newRiskAssessment = new RiskAssessment(req.body);
    await newRiskAssessment.save();
    res.status(201).json(newRiskAssessment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Risk Assessment entries
export const getRiskAssessments = async (req, res) => {
  try {
    const riskAssessments = await RiskAssessment.find();
    res.status(200).json(riskAssessments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single Risk Assessment entry by ID
export const getRiskAssessmentById = async (req, res) => {
  try {
    const riskAssessment = await RiskAssessment.findById(req.params.id);
    if (!riskAssessment) {
      return res.status(404).json({ message: 'Risk Assessment not found' });
    }
    res.status(200).json(riskAssessment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Risk Assessment entry by ID
export const updateRiskAssessment = async (req, res) => {
  try {
    const updatedRiskAssessment = await RiskAssessment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRiskAssessment) {
      return res.status(404).json({ message: 'Risk Assessment not found' });
    }
    res.status(200).json(updatedRiskAssessment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a Risk Assessment entry by ID
export const deleteRiskAssessment = async (req, res) => {
  try {
    const deletedRiskAssessment = await RiskAssessment.findByIdAndDelete(req.params.id);
    if (!deletedRiskAssessment) {
      return res.status(404).json({ message: 'Risk Assessment not found' });
    }
    res.status(200).json({ message: 'Risk Assessment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};