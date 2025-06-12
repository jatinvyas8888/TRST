import express from "express";
import {
  createEquipment,
  getAllEquipment,
  getEquipmentById, // ✅ Corrected function name
  updateEquipment,
  deleteEquipment,
} from "../controllers/equipment.controller.js";

const router = express.Router();

// ✅ Routes
router.post("/Ecreate", createEquipment);   // Create Equipment
router.get("/", getAllEquipment);           // Get All Equipment
router.get("/:id", getEquipmentById);       // Get Single Equipment (Fixed Name)
router.put("/update/:id", updateEquipment);        // Update Equipment
router.delete("/:id", deleteEquipment);     // Delete Equipment

export default router;
