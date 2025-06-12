import PlanApprovalGroup from '../models/planApprovalGroup.model.js';

// Create a new plan approval group
export const createPlanApprovalGroup = async (req, res) => {
  try {
    const { planApprovalGroup, groupDescription } = req.body;
    const newPlanApprovalGroup = new PlanApprovalGroup({ planApprovalGroup, groupDescription });
    await newPlanApprovalGroup.save();
    res.status(201).json({ success: true, data: newPlanApprovalGroup });
  } catch (error) {
    console.error("Error creating plan approval group:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all plan approval groups
export const getPlanApprovalGroups = async (req, res) => {
  try {
    const planApprovalGroups = await PlanApprovalGroup.find();
    console.log("Fetched Plan Approval Groups:", planApprovalGroups);
    res.status(200).json({ success: true, data: planApprovalGroups });
  } catch (error) {
    console.error("Error fetching plan approval groups:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single plan approval group by ID
export const getPlanApprovalGroupById = async (req, res) => {
  try {
    const planApprovalGroup = await PlanApprovalGroup.findById(req.params.id);
    if (!planApprovalGroup) {
      return res.status(404).json({ success: false, message: 'Plan Approval Group not found' });
    }
    res.status(200).json({ success: true, data: planApprovalGroup });
  } catch (error) {
    console.error("Error fetching plan approval group:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a plan approval group by ID
export const updatePlanApprovalGroup = async (req, res) => {
  try {
    const { planApprovalGroup, groupDescription } = req.body;
    const updatedPlanApprovalGroup = await PlanApprovalGroup.findByIdAndUpdate(
      req.params.id,
      { planApprovalGroup, groupDescription },
      { new: true }
    );
    if (!updatedPlanApprovalGroup) {
      return res.status(404).json({ success: false, message: 'Plan Approval Group not found' });
    }
    res.status(200).json({ success: true, data: updatedPlanApprovalGroup });
  } catch (error) {
    console.error("Error updating plan approval group:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a plan approval group by ID
export const deletePlanApprovalGroup = async (req, res) => {
  try {
    const deletedPlanApprovalGroup = await PlanApprovalGroup.findByIdAndDelete(req.params.id);
    if (!deletedPlanApprovalGroup) {
      return res.status(404).json({ success: false, message: 'Plan Approval Group not found' });
    }
    res.status(200).json({ success: true, message: 'Plan Approval Group deleted successfully' });
  } catch (error) {
    console.error("Error deleting plan approval group:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};