import VendorContact from '../models/vendorContact.model.js';

// Create a new vendor contact
export const createVendorContact = async (req, res) => {
  try {
    const newVendorContact = new VendorContact(req.body);
    const savedVendorContact = await newVendorContact.save();
    res.status(201).json(savedVendorContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all vendor contacts
export const getAllVendorContacts = async (req, res) => {
  try {
    const vendorContacts = await VendorContact.find();
    res.status(200).json(vendorContacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};