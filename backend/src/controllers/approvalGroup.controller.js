import ApprovalGroup from '../models/approvalGroup.model.js';

// Create a new approval group
export const createApprovalGroup = async (req, res) => {
  try {
    const { approvalGroup, groupDescription } = req.body;
    const newApprovalGroup = new ApprovalGroup({ approvalGroup, groupDescription });
    await newApprovalGroup.save();
    res.status(201).json({ success: true, data: newApprovalGroup });
  } catch (error) {
    console.error("Error creating approval group:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all approval groups
export const getApprovalGroups = async (req, res) => {
  try {
    const approvalGroups = await ApprovalGroup.find();
    console.log("Fetched Approval Groups:", approvalGroups);
    res.status(200).json({ success: true, data: approvalGroups });
  } catch (error) {
    console.error("Error fetching approval groups:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single approval group by ID
export const getApprovalGroupById = async (req, res) => {
  try {
    const approvalGroup = await ApprovalGroup.findById(req.params.id);
    if (!approvalGroup) {
      return res.status(404).json({ success: false, message: 'Approval Group not found' });
    }
    res.status(200).json({ success: true, data: approvalGroup });
  } catch (error) {
    console.error("Error fetching approval group:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update an approval group by ID
export const updateApprovalGroup = async (req, res) => {
  try {
    const { approvalGroup, groupDescription } = req.body;
    const updatedApprovalGroup = await ApprovalGroup.findByIdAndUpdate(
      req.params.id,
      { approvalGroup, groupDescription },
      { new: true }
    );
    if (!updatedApprovalGroup) {
      return res.status(404).json({ success: false, message: 'Approval Group not found' });
    }
    res.status(200).json({ success: true, data: updatedApprovalGroup });
  } catch (error) {
    console.error("Error updating approval group:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete an approval group by ID
export const deleteApprovalGroup = async (req, res) => {
  try {
    const deletedApprovalGroup = await ApprovalGroup.findByIdAndDelete(req.params.id);
    if (!deletedApprovalGroup) {
      return res.status(404).json({ success: false, message: 'Approval Group not found' });
    }
    res.status(200).json({ success: true, message: 'Approval Group deleted successfully' });
  } catch (error) {
    console.error("Error deleting approval group:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
