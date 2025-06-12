import ActiveIncident from '../models/activeIncidents.model.js'; // Adjust the import path as necessary

 export const createIncident = async (req, res) => {
  try {
    const {
      incident,
      incidentDate,
      incidentType,
      incidentDescription,
      severity,
      incidentCommander,
      location,
      application,
      plans,
      process,
      vendors,
    } = req.body;

    // Create a new ActiveIncident instance
    const newIncident = new ActiveIncident({
      incident,
      incidentDate,
      incidentType,
      incidentDescription,
      severity,
      incidentCommander,
      location,
      application,
      plans,
      process,
      vendors,
    });

    // Save the incident to the database
    const savedIncident = await newIncident.save();
    return res.status(201).json({ success: true, data: savedIncident });
  } catch (error) {
    console.error("Error saving incident:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// Function to get all incidents
export const getAllIncidents = async (req, res) => {
  try {
    // Retrieve all incidents from the database and populate the referenced fields
    const incidents = await ActiveIncident.find()
      // .populate('incidentCommander', 'userName') // Assuming 'name' is a field in the User model
      .populate('location', 'loactionName') // Assuming 'name' is a field in the Location model
      .populate('application', 'applicationName') // Assuming 'name' is a field in the Application model
      .populate('plans', 'plan_name') // Assuming 'name' is a field in the Plan model
      // .populate('process', 'name') // Assuming 'name' is a field in the Process model
      // .populate('vendors', 'name'); // Assuming 'name' is a field in the Vendors model

    return res.status(200).json({ success: true, data: incidents });
  } catch (error) {
    console.error("Error retrieving incidents:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// export default createIncident;