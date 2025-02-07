import ClientContacts from '../models/clientContacts.model.js';
import Client from '../models/clients.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import mongoose from 'mongoose';

// Helper function to find clients by ID or name
const findClients = async (clientIdentifiers) => {
  const clientPromises = clientIdentifiers.map(async (identifier) => {
    // Check if identifier is a valid MongoDB ID
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      return Client.findById(identifier);
    }
    // If not a valid ID, search by company name
    return Client.findOne({ company: identifier });
  });

  return Promise.all(clientPromises);
};

// Create a new client contact
const createClientContact = asyncHandler(async (req, res) => {
  const {
    clients, // Array of client IDs or names
    firstName,
    lastName,
    middleName,
    emailAddress,
    workPhone,
    workMobilePhone,
    alternatePhone,
    fax
  } = req.body;

//   if (!clients?.length) {
//     throw new ApiError(400, "At least one client is required");
//   }

  // Find clients by ID or name
  const existingClients = await findClients(clients);
  
  // Filter out any null results and get their IDs
  const foundClientIds = existingClients
    .filter(client => client)
    .map(client => client._id);

  if (!foundClientIds.length) {
    throw new ApiError(404, "No valid clients found");
  }

  // Create contact with found client IDs
  const newContact = await ClientContacts.create({
    clients: foundClientIds,
    firstName,
    lastName,
    middleName: middleName || "",
    emailAddress: emailAddress || "",
    workPhone: workPhone || "",
    workMobilePhone: workMobilePhone || "",
    alternatePhone: alternatePhone || "",
    fax: fax || "",
    updatedBy: req.user._id
  });

  const populatedContact = await ClientContacts.findById(newContact._id)
    .populate('clients', 'company')
    .populate('updatedBy', 'firstName lastName');

  return res.status(201).json(
    new ApiResponse(201, populatedContact, "Client contact created successfully")
  );
});

// Get all client contacts
const getAllClientContact = asyncHandler(async (req, res) => {
  const { clientId } = req.query;
  let query = {};

  // If clientId is provided, filter by client
  if (clientId) {
    if (!mongoose.Types.ObjectId.isValid(clientId)) {
      throw new ApiError(400, "Invalid client ID");
    }
    query.clients = clientId;  // Changed from client to clients
  }

  const contacts = await ClientContacts.find(query)
    .populate('clients', 'company')
    .populate('updatedBy', 'firstName lastName')
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, contacts, "Client contacts fetched successfully")
  );
});

// Get a single client contact
const getClientContact = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const contact = await ClientContacts.findById(id)
    .populate('clients', 'company')
    .populate('updatedBy', 'firstName lastName');

  if (!contact) {
    throw new ApiError(404, "Client contact not found");
  }

  return res.status(200).json(
    new ApiResponse(200, contact, "Client contact fetched successfully")
  );
});

// Update a client contact
const updateClientContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    clients,  // Array of client IDs or names
    firstName,
    lastName,
    middleName,
    emailAddress,
    workPhone,
    workMobilePhone,
    alternatePhone,
    fax
  } = req.body;

  const contact = await ClientContacts.findById(id);
  if (!contact) {
    throw new ApiError(404, "Client contact not found");
  }

  // If clients array is being updated
  if (clients?.length) {
    const existingClients = await findClients(clients);
    
    // Filter out any null results and get their IDs
    const foundClientIds = existingClients
      .filter(client => client)
      .map(client => client._id);

    if (!foundClientIds.length) {
      throw new ApiError(404, "No valid clients found");
    }
    
    contact.clients = foundClientIds;
  }

  // Update other fields
  if (firstName) contact.firstName = firstName;
  if (lastName) contact.lastName = lastName;
  contact.middleName = middleName || contact.middleName;
  contact.emailAddress = emailAddress || contact.emailAddress;
  contact.workPhone = workPhone || contact.workPhone;
  contact.workMobilePhone = workMobilePhone || contact.workMobilePhone;
  contact.alternatePhone = alternatePhone || contact.alternatePhone;
  contact.fax = fax || contact.fax;
  contact.updatedBy = req.user._id;

  const updatedContact = await contact.save();

  const populatedContact = await ClientContacts.findById(updatedContact._id)
    .populate('clients', 'company')
    .populate('updatedBy', 'firstName lastName');

  return res.status(200).json(
    new ApiResponse(200, populatedContact, "Client contact updated successfully")
  );
});

// Delete a client contact
const deleteClientContact = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const contact = await ClientContacts.findById(id);
  if (!contact) {
    throw new ApiError(404, "Client contact not found");
  }

  await ClientContacts.findByIdAndDelete(id);

  return res.status(200).json(
    new ApiResponse(200, {}, "Client contact deleted successfully")
  );
});

export {
  createClientContact,
  updateClientContact,
  deleteClientContact,
  getClientContact,
  getAllClientContact,
};
