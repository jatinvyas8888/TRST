// backend/src/controllers/databaseController.js
import Database from '../models/database.model.js';

// Controller to handle creating a new database

// ✅ Create a new database entry
export const createDatabase = async (req, res) => {
    try {
      const {
        databaseName,
        databaseVersion,
        databaseOwner,
        databaseDescription,
        endPointAddress,
        databaseType,
        drStrategy,
        hostedType,
        rto,
        applications,
        hardware,
        updatedBy
      } = req.body;
  
      // Validate required fields
      if (!databaseName) {
        return res.status(400).json({ success: false, message: "Database name is required." });
      }
  
      // Create a new database entry
      const newDatabase = new Database({
        databaseId: `DB${Date.now()}`, // Auto-generate databaseId
        databaseName,
        databaseVersion,
        databaseOwner: databaseOwner ? databaseOwner.map(id => id) : [], // Store multiple owners
        databaseDescription,
        endPointAddress,
        databaseType,
        drStrategy,
        hostedType,
        rto: Array.isArray(rto) ? rto : [rto], // Ensure multiple RTOs are stored correctly
        applications: applications ? applications.map(id => id) : [], // Store application dependencies
        hardware: hardware ? hardware.map(id => id) : [],
        updatedBy,
      });
  
      // Save to MongoDB
      await newDatabase.save();
  
      return res.status(201).json({
        success: true,
        message: "Database created successfully",
        data: newDatabase
      });
  
    } catch (error) {
      console.error("Error creating database:", error);
      res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
  };

