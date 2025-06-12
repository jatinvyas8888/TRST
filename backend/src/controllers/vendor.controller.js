import Vendor from '../models/vendor.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

// Create a new vendor
export const createVendor = asyncHandler(async (req, res) => {
  const vendor = new Vendor(req.body);
  await vendor.save();
  res.status(201).json(vendor);
});

// Get all vendors
export const getAllVendors = asyncHandler(async (req, res) => {
  try {
    const vendors = await Vendor.find();

    if (!vendors || vendors.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No vendors found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Vendors fetched successfully",
      data: vendors, // ✅ Return vendors inside a `data` object
    });
  } catch (error) {
    console.error("❌ Error fetching vendors:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});
// Get a single vendor by ID
export const getVendorById = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findById(req.params.id);
  if (!vendor) {
    throw new ApiError(404, 'Vendor not found');
  }
  res.status(200).json(vendor);
});

// Update a vendor by ID
export const updateVendorById = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!vendor) {
    throw new ApiError(404, 'Vendor not found');
  }
  res.status(200).json(vendor);
});

// Delete a vendor by ID
export const deleteVendorById = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findByIdAndDelete(req.params.id);
  if (!vendor) {
    throw new ApiError(404, 'Vendor not found');
  }
  res.status(204).send();
});