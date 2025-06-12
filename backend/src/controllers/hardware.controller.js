// backend/src/controllers/hardware.controller.js
import Hardware from '../models/hardware.model.js';

// Controller to handle creating a new hardware entry
const createHardware = async (req, res) => {
    try {
        const hardwareData = req.body; // Get the data from the request body
        const newHardware = await Hardware.create(hardwareData); // Create a new hardware entry
        res.status(201).json(newHardware); // Respond with the created hardware object
    } catch (error) {
        console.error('Error creating hardware:', error);
        res.status(500).json({ error: 'Failed to create hardware' }); // Handle errors
    }
};

// Controller to handle fetching all hardware entries
const getAllHardware = async (req, res) => {
    try {
        const hardware = await Hardware.find(); // Fetch all hardware entries
        res.status(200).json(hardware); // Respond with the list of hardware
    } catch (error) {
        console.error('Error fetching hardware:', error);
        res.status(500).json({ error: 'Failed to fetch hardware' }); // Handle errors
    }
};

export {
    createHardware,
    getAllHardware,
};