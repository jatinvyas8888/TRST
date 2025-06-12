import BIADashboard from '../models/biaDashboard.model.js';

// Create a new BIA Dashboard entry
export const createBIADashboard = async (req, res) => {
  try {
    const newBIADashboard = new BIADashboard(req.body);
    await newBIADashboard.save();
    res.status(201).json(newBIADashboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all BIA Dashboard entries
export const getBIADashboards = async (req, res) => {
  try {
    const biaDashboards = await BIADashboard.find();
    res.status(200).json(biaDashboards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single BIA Dashboard entry by ID
export const getBIADashboardById = async (req, res) => {
  try {
    const biaDashboard = await BIADashboard.findById(req.params.id);
    if (!biaDashboard) {
      return res.status(404).json({ message: 'BIA Dashboard not found' });
    }
    res.status(200).json(biaDashboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a BIA Dashboard entry by ID
export const updateBIADashboard = async (req, res) => {
  try {
    const updatedBIADashboard = await BIADashboard.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBIADashboard) {
      return res.status(404).json({ message: 'BIA Dashboard not found' });
    }
    res.status(200).json(updatedBIADashboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a BIA Dashboard entry by ID
export const deleteBIADashboard = async (req, res) => {
  try {
    const deletedBIADashboard = await BIADashboard.findByIdAndDelete(req.params.id);
    if (!deletedBIADashboard) {
      return res.status(404).json({ message: 'BIA Dashboard not found' });
    }
    res.status(200).json({ message: 'BIA Dashboard deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};