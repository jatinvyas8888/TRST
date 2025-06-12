import Supply from '../models/supply.model.js';

// Create a new supply
export const createSupply = async (req, res) => {
  try {
    const newSupply = new Supply(req.body);
    const savedSupply = await newSupply.save();
    res.status(201).json(savedSupply);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all supplies
export const getAllSupplies = async (req, res) => {
  try {
    const supplies = await Supply.find();
    res.status(200).json(supplies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};