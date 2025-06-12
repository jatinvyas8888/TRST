import Activity from '../models/activities.model.js';

// Create a new Activity entry
export const createActivity = async (req, res) => {
  try {
    console.log("📥 Received Data:", req.body); // Debugging line

    const newActivity = new Activity(req.body);
    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (error) {
    console.error("❌ Backend Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get all Activity entries
export const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find();

    if (!activities.length) {
      return res.status(404).json({
        statusCode: 404,
        data: [],
        message: "No activities found",
      });
    }

    res.status(200).json({
      statusCode: 200,
      data: activities,
      message: "Activities fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


// Get a single Activity entry by ID
export const getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an Activity entry by ID
export const updateActivity = async (req, res) => {
  try {
    const updatedActivity = await Activity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedActivity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.status(200).json(updatedActivity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an Activity entry by ID
export const deleteActivity = async (req, res) => {
  try {
    const deletedActivity = await Activity.findByIdAndDelete(req.params.id);
    if (!deletedActivity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};