import Client from '../models/clients.model.js';
import mongoose from 'mongoose';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

// Create a new client
const createClient = asyncHandler(async (req, res) => {
  const {
    company,
    website,
    mainPhone,
    fax,
    address1,
    address2,
    city,
    stateProvince,
    country,
    zipCode,
  } = req.body;

  console.log("Request user:", req.user);
  console.log("Request body:", req.body);

  if (!company?.trim()) {
    throw new ApiError(400, "Company name is required");
  }

  try {
    const newClient = await Client.create({
      company,
      website: website || "",
      mainPhone: mainPhone || "",
      fax: fax || "",
      address1: address1 || "",
      address2: address2 || "",
      city: city || "",
      stateProvince: stateProvince || "",
      country: country || "",
      zipCode: zipCode || "",
      updatedBy: req.user._id
    });

    return res.status(201).json(
      new ApiResponse(
        201,
        newClient,
        "Client created successfully"
      )
    );
  } catch (error) {
    console.error("Database error:", error);
    throw new ApiError(500, "Error creating client");
  }
});

// Get all clients
const getAllClients = asyncHandler(async (req, res) => {
  const clients = await Client.find()
    .populate('updatedBy', 'firstName lastName')
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, clients, "Clients fetched successfully")
  );
});

// Get a single client by ID
const getClient = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const client = await Client.findById(id)
    .populate('updatedBy', 'firstName lastName');

  if (!client) {
    throw new ApiError(404, "Client not found");
  }

  return res.status(200).json(
    new ApiResponse(200, client, "Client fetched successfully")
  );
});

// Update a client
const updateClient = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    company,
    website,
    mainPhone,
    fax,
    address1,
    address2,
    city,
    stateProvince,
    country,
    zipCode,
  } = req.body;

  const client = await Client.findById(id);
  if (!client) {
    throw new ApiError(404, "Client not found");
  }

  // Update all fields, allowing empty values
  client.company = company !== undefined ? company : client.company;
  client.website = website !== undefined ? website : client.website;
  client.mainPhone = mainPhone !== undefined ? mainPhone : client.mainPhone;
  client.fax = fax !== undefined ? fax : client.fax;
  client.address1 = address1 !== undefined ? address1 : client.address1;
  client.address2 = address2 !== undefined ? address2 : client.address2;
  client.city = city !== undefined ? city : client.city;
  client.stateProvince = stateProvince !== undefined ? stateProvince : client.stateProvince;
  client.country = country !== undefined ? country : client.country;
  client.zipCode = zipCode !== undefined ? zipCode : client.zipCode;
  client.updatedBy = req.user?._id;

  const updatedClient = await client.save();

  return res.status(200).json(
    new ApiResponse(200, updatedClient, "Client updated successfully")
  );
});

// Delete a client
const deleteClient = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const client = await Client.findById(id);
  if (!client) {
    throw new ApiError(404, "Client not found");
  }

  await Client.findByIdAndDelete(id);

  return res.status(200).json(
    new ApiResponse(200, {}, "Client deleted successfully")
  );
});

export {
  createClient,
  getAllClients,
  getClient,
  updateClient,
  deleteClient
};
