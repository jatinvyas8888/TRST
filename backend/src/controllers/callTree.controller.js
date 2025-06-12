import CallTree from '../models/callTree.model.js';
import Employee from '../models/employees.model.js';
import ClientContacts from '../models/clientContacts.model.js';
import VendorContacts from '../models/vendorContact.model.js';

// Create a new CallTree
export const createCallTree = async (req, res) => {
  try {
    const callTree = new CallTree(req.body);
    await callTree.save();
    res.status(201).json(callTree);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all CallTrees
export const getAllCallTrees = async (req, res) => {
  try {
    const callTrees = await CallTree.find()
      .populate('employees', '_id firstName lastName') // Populate employee IDs and names
      .populate('clientContacts', '_id firstName lastName') // Populate client contact IDs and names
      .populate('vendorContacts', '_id vendorName'); // Populate vendor contact IDs and names

    console.log("Fetched CallTrees from DB:", callTrees); // Debugging
    res.status(200).json(callTrees);
  } catch (error) {
    console.error("Error fetching CallTrees:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Update a CallTree by ID
export const updateCallTree = async (req, res) => {
  const { id } = req.params; // Extract the ID from the request parameters
  const updates = req.body; // Extract the updates from the request body

  try {
    const updatedCallTree = await CallTree.findByIdAndUpdate(
      id, // The ID of the CallTree to update
      updates, // The updates to apply
      { new: true, runValidators: true } // Return the updated document and run validation
    )
      .populate('employees', '_id firstName lastName') // Populate employee IDs and names
      .populate('clientContacts', '_id firstName lastName') // Populate client contact IDs and names
      .populate('vendorContacts', '_id vendorName'); // Populate vendor contact IDs and names

    if (!updatedCallTree) {
      return res.status(404).json({ message: "CallTree not found" });
    }

    res.status(200).json(updatedCallTree);
  } catch (error) {
    console.error("Error updating CallTree:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Delete a CallTree by ID
export const deleteCallTree = async (req, res) => {
  const { id } = req.params; // Extract the ID from the request parameters

  try {
    const deletedCallTree = await CallTree.findByIdAndDelete(id); // Find and delete the CallTree by ID

    if (!deletedCallTree) {
      return res.status(404).json({ message: "CallTree not found" }); // If no CallTree is found, return 404
    }

    res.status(200).json({ message: "CallTree deleted successfully" }); // Return success message
  } catch (error) {
    console.error("Error deleting CallTree:", error.message);
    res.status(500).json({ message: error.message }); // Return error message
  }
};
// Get a single CallTree by ID
export const getCallTreeById = async (req, res) => {
  const { id } = req.params;
  console.log("Received ID:", id); // Debugging log
  try {
    const callTree = await CallTree.findById(id)
      .populate('employees', '_id firstName lastName')
      .populate('clientContacts', '_id firstName lastName')
      .populate('vendorContacts', '_id vendorName');

    if (!callTree) {
      console.log("CallTree not found for ID:", id); // Debugging log
      return res.status(404).json({ message: 'CallTree not found' });
    }

    res.status(200).json(callTree);
  } catch (error) {
    console.error("Error fetching CallTree:", error.message); // Debugging log
    res.status(500).json({ message: error.message });
  }
};