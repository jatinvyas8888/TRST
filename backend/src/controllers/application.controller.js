// backend/src/controllers/application.controller.js
import mongoose from "mongoose"; // ✅ Add this line
import Application from '../models/application.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

import Employee from "../models/employees.model.js";
import Vendor from "../models/vendor.model.js";
import { BusinessEntity } from "../models/organizationalEntities.model.js";
import Location from "../models/locations.model.js";
import { User } from "../models/user.model.js";

// ✅ Create a new application
export const createApplication = async (req, res) => {
  try {
    console.log("📥 Incoming Request Data:", req.body); // ✅ Log incoming request

    const {
      applicationID,
      applicationName,
      applicationType,
      applicationAlias,
      applicationURL,
      description,
      hostedType,
      applicationOwner,
      businessOwner,
      businessEntity,
      primaryDataCenter,
      alternateDataCenter,
      applicationVendor, // ✅ Add applicationVendor
      drStrategy,
      rto,
      rpo,
    } = req.body;

    // ✅ Validate Required Fields
    if (!applicationID || !applicationName || !applicationType || !hostedType || !applicationOwner || !businessOwner || !businessEntity || !primaryDataCenter) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ Ensure IDs are Valid MongoDB ObjectIds
    const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

    const validateArray = (arr, fieldName) => {
      if (arr && !arr.every(isValidObjectId)) {
        throw new Error(`Invalid ${fieldName} ID(s) provided`);
      }
    };

    try {
      validateArray(applicationOwner, "Application Owner");
      validateArray(businessOwner, "Business Owner");
      validateArray(businessEntity, "Business Entity");
      validateArray(primaryDataCenter, "Primary Data Center");
      validateArray(alternateDataCenter, "Alternate Data Center");
      validateArray(applicationVendor, "Application Vendor");
    } catch (validationError) {
      return res.status(400).json({ message: validationError.message });
    }

    // ✅ Create Application in MongoDB
    const newApplication = new Application({
      applicationID,
      applicationName,
      applicationType, // Stored as string
      applicationAlias,
      applicationURL,
      description,
      hostedType,
      applicationOwner,
      businessOwner,
      businessEntity,
      primaryDataCenter,
      alternateDataCenter,
      applicationVendor, // ✅ Add vendor list
      drStrategy,
      rto,
      rpo,
    });

    await newApplication.save();
    return res.status(201).json({ message: "Application created successfully!", data: newApplication });

  } catch (error) {
    console.error("❌ Error creating application:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};



// ✅ Get all applications
export const getAllApplications = async (req, res) => {
  try {
    console.log("📥 Fetching all applications...");

    // ✅ Fetch applications with populated references
    const applications = await Application.find()
      .populate("applicationOwner", "fullName email") // Fetch application owner details
      .populate("businessOwner", "firstName lastName email") // Fetch business owner details
      .populate("businessEntity", "businessEntity businessEntityType") // Fetch business entity details
      .populate("primaryDataCenter", "locationName address") // Fetch primary data center details
      .populate("alternateDataCenter", "locationName address") // Fetch alternate data center details
      .populate("applicationVendor", "vendor mainPhone website"); // Fetch vendor details

    if (!applications || applications.length === 0) {
      return res.status(404).json({ message: "No applications found" });
    }

    console.log("✅ Applications retrieved successfully!");
    res.status(200).json({ success: true, data: applications });

  } catch (error) {
    console.error("❌ Error fetching applications:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
// ✅ Get application by ID
export const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid application ID" });
    }

    const application = await Application.findById(id)
      .populate("applicationOwner", "fullName username email")
      .populate("businessOwner", "firstName lastName email")
      .populate("businessEntity", "businessEntity businessEntityType")
      .populate("primaryDataCenter", "locationName address")
      .populate("alternateDataCenter", "locationName address")
      .populate("applicationVendor", "vendor mainPhone website");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    const businessEntitiesRelationships = await BusinessEntity.find({ applicationIds: id })
      .select("businessEntity description businessEntityType businessEntityId parentBusinessEntity childBusinessEntities relatedLocations employees locations");

    // 🟢 Final response includes both
    res.status(200).json({
      success: true,
      data: {
        application,
        relatedBusinessEntities: businessEntitiesRelationships,
      }
    });

  } catch (error) {
    console.error("❌ Error fetching application by ID:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


// ✅ Update application
export const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("🔄 Updating application:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid application ID" });
    }

    const updatedData = req.body;

    const updatedApplication = await Application.findByIdAndUpdate(id, updatedData, { new: true })
      .populate("applicationOwner", "fullName username email")
      .populate("businessOwner", "firstName lastName email")
      .populate("businessEntity", "businessEntity businessEntityType")
      .populate("primaryDataCenter", "locationName address")
      .populate("alternateDataCenter", "locationName address")
      .populate("applicationVendor", "vendor mainPhone website");

    if (!updatedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ message: "Application updated successfully!", data: updatedApplication });

  } catch (error) {
    console.error("❌ Error updating application:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
// ✅ Delete application by ID
export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("🗑 Deleting application:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid application ID" });
    }

    const deletedApplication = await Application.findByIdAndDelete(id);

    if (!deletedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ message: "Application deleted successfully!" });

  } catch (error) {
    console.error("❌ Error deleting application:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
