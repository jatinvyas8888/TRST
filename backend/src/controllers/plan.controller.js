// src/controllers/plan.controller.js
import Plan from '../models/plan.model.js';

export const createPlan = async (req, res) => {
  try {
    // Extract data from the request body
    const {
      plan_name,
      plan_leader,
      plan_editors,
      plan_type,
      business_entity,
      location,
      process,
      application,
      hardware,
    } = req.body;

    // Create a new plan instance
    const newPlan = new Plan({
      plan_name,
      plan_leader, // Expecting an array of ObjectIds
      plan_editors, // Expecting an array of ObjectIds
      plan_type,
      business_entity, // Expecting an array of ObjectIds
      location, // Expecting an array of ObjectIds
      process, // Expecting an array of ObjectIds
      application, // Expecting an array of ObjectIds
      hardware, // Expecting an array of ObjectIds
    });

    // Save the new plan to the database
    const savedPlan = await newPlan.save();

    // Respond with the created plan
    res.status(201).json(savedPlan);
  } catch (error) {
    console.error('Error creating plan:', error);
    res.status(400).json({ message: 'Error creating plan', error });
  }
};

// Controller to get all plans with populated leader and editor names
export const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find()
      .populate('plan_leader', 'firstName lastname') // Populate the plan_leader field with the name
      .populate('plan_editors', 'fullName') // Populate the plan_editors field with the name
      .populate('business_entity', 'businessEntity') // Populate business_entity if needed
      .populate('location', 'locationName') // Populate location if needed
      // .populate('process', 'name') // Populate process if needed
      .populate('application', 'applicationName') // Populate application if needed
      .populate('hardware', 'hardwareName'); // Populate hardware if needed

    res.status(200).json({ message: 'Plans retrieved successfully', data: plans });
  } catch (error) {
    console.error('Error retrieving plans:', error);
    res.status(500).json({ message: 'Error retrieving plans', error: error.message });
  }
};

// Controller to update a specific plan by ID
export const updatePlan = async (req, res) => {
  try {
    const { id } = req.params; // Get the plan ID from the request parameters
    const {
      plan_name,
      plan_leader,
      plan_editors,
      plan_type,
      business_entity,
      location,
      process,
      application,
      hardware,
    } = req.body;

    // Find the plan by ID and update it
    const updatedPlan = await Plan.findByIdAndUpdate(
      id,
      {
        plan_name,
        plan_leader, // Expecting an array of ObjectIds
        plan_editors, // Expecting an array of ObjectIds
        plan_type,
        business_entity, // Expecting an array of ObjectIds
        location, // Expecting an array of ObjectIds
        process, // Expecting an array of ObjectIds
        application, // Expecting an array of ObjectIds
        hardware, // Expecting an array of ObjectIds
      },
      { new: true } // Return the updated document
    );

    if (!updatedPlan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    // Respond with the updated plan
    res.status(200).json(updatedPlan);
  } catch (error) {
    console.error('Error updating plan:', error);
    res.status(400).json({ message: 'Error updating plan', error });
  }
};
// Controller to get a plan by ID
export  const getPlanById = async (req, res) => {
  const { id } = req.params; // Get the ID from the request parameters

  try {
    const plan = await Plan.findById(id); // Find the plan by ID

    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' }); // Handle not found
    }

    res.status(200).json(plan); // Return the found plan
  } catch (error) {
    console.error('Error fetching plan:', error);
    res.status(500).json({ message: 'Server error' }); // Handle server error
  }
};
export const deletePlanById = async (req, res) => {
  const { id } = req.params; // Get the ID from the request parameters

  try {
    const deletedPlan = await Plan.findByIdAndDelete(id); // Delete the plan by ID

    if (!deletedPlan) {
      return res.status(404).json({ message: 'Plan not found' }); // Handle not found
    }

    res.status(200).json({ message: 'Plan deleted successfully' }); // Return success message
  } catch (error) {
    console.error('Error deleting plan:', error);
    res.status(500).json({ message: 'Server error' }); // Handle server error
  }
};