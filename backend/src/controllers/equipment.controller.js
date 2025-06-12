import Equipment from "../models/equipment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

// ✅ Create Equipment
const createEquipment = asyncHandler(async (req, res) => {
  try {
    console.log("Received Data:", req.body); // Debug input data

    const { equipment, equipmentType, modelName, vendors, description, biaEquipmentDependency } = req.body;

    if (!equipment?.trim()) {
      throw new ApiError(400, "Equipment name is required");
    }

    // ✅ Ensure vendors is an array of ObjectIds
    const vendorIds = (Array.isArray(vendors) ? vendors : []).map((v) => new mongoose.Types.ObjectId(v));

    const newEquipment = await Equipment.create({
      equipment,
      equipmentType,
      modelName,
      vendors: vendorIds, // ✅ Store correctly
      description,
      biaEquipmentDependency,
    });

    console.log("Created Equipment:", newEquipment); // Debug response

    return res.status(201).json(new ApiResponse(201, newEquipment, "Equipment created successfully"));
  } catch (error) {
    console.error("Server Error:", error); // Log the actual error
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// ✅ Get All Equipment
const getAllEquipment = asyncHandler(async (req, res) => {
  try {
    console.log("Fetching all equipment...");

    const equipment = await Equipment.find()
      .populate("vendors", "vendor") // ✅ Populate vendor names
      .sort({ createdAt: -1 });

    return res.status(200).json(new ApiResponse(200, equipment, "Equipment fetched successfully"));
  } catch (error) {
    console.error("Error fetching equipment:", error);
    return res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
  }
});

// ✅ Get Equipment by ID
const getEquipmentById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Fetching equipment with ID: ${id}`);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json(new ApiResponse(400, null, "Invalid equipment ID"));
    }

    // ✅ Populate vendors with vendorName field
    const equipment = await Equipment.findById(id).populate("vendors", "vendor");

    if (!equipment) {
      return res.status(404).json(new ApiResponse(404, null, "Equipment not found"));
    }

    return res.status(200).json(new ApiResponse(200, equipment, "Equipment fetched successfully"));
  } catch (error) {
    console.error("Error fetching equipment by ID:", error);
    return res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
  }
});


// ✅ Update Equipment by ID
const updateEquipment = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Updating equipment with ID: ${id}`);

    const { equipment, equipmentType, modelName, vendors, description, biaEquipmentDependency } = req.body;

    // ✅ Ensure vendors is an array of ObjectIds
    const vendorIds = (Array.isArray(vendors) ? vendors : []).map((v) => new mongoose.Types.ObjectId(v));

    const updatedEquipment = await Equipment.findByIdAndUpdate(
      id,
      {
        equipment,
        equipmentType,
        modelName,
        vendors: vendorIds,
        description,
        biaEquipmentDependency,
      },
      { new: true }
    ).populate("vendors", "vendor");

    if (!updatedEquipment) {
      return res.status(404).json(new ApiResponse(404, null, "Equipment not found"));
    }

    return res.status(200).json(new ApiResponse(200, updatedEquipment, "Equipment updated successfully"));
  } catch (error) {
    console.error("Error updating equipment:", error);
    return res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
  }
});

// ✅ Delete Equipment by ID
const deleteEquipment = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Deleting equipment with ID: ${id}`);

    const deletedEquipment = await Equipment.findByIdAndDelete(id);

    if (!deletedEquipment) {
      return res.status(404).json(new ApiResponse(404, null, "Equipment not found"));
    }

    return res.status(200).json(new ApiResponse(200, null, "Equipment deleted successfully"));
  } catch (error) {
    console.error("Error deleting equipment:", error);
    return res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
  }
});

export { createEquipment, getAllEquipment, getEquipmentById, updateEquipment, deleteEquipment };
