import ClientContacts from '../models/clientContacts.model.js';
import Client from '../models/clients.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import mongoose from 'mongoose';


// Create a new client contact
const createClientContact = asyncHandler(async (req, res) => {
  const {
    clients,
    firstName,
    lastName,
    middleName,
    emailAddress,
    workPhone,
    workMobilePhone,
    alternatePhone,
    fax,
    title
  } = req.body;

  // Validate required fields
  if (!firstName || !lastName) {
    throw new ApiError(400, "First name and last name are required");
  }

  // Process clients if provided
  let clientIds = [];
  let clientNames = [];
  if (clients && Array.isArray(clients)) {
    try {
      // First try to find by ID
      const foundClients = await Client.find({ 
        _id: { $in: clients }
      });

      if (foundClients.length === clients.length) {
        // All found by ID
        clientIds = foundClients.map(client => client._id);
        clientNames = foundClients.map(client => client.company);
      } else {
        // If not all found by ID, try by company name
        const clientsByName = await Client.find({ 
          company: { $in: clients }
        });

        if (clientsByName.length !== clients.length) {
          throw new ApiError(404, "One or more clients not found");
        }

        clientIds = clientsByName.map(client => client._id);
        clientNames = clientsByName.map(client => client.company);
      }
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        // If cast error (invalid ObjectId), try finding by name directly
        const clientsByName = await Client.find({ 
          company: { $in: clients }
        });

        if (clientsByName.length !== clients.length) {
          throw new ApiError(404, "One or more clients not found");
        }

        clientIds = clientsByName.map(client => client._id);
        clientNames = clientsByName.map(client => client.company);
      } else {
        throw error;
      }
    }
  }

  // Create contact with validated client IDs
  const newContact = await ClientContacts.create({
    clients: clientIds,
    clientNames, // Add this field to your schema if you want to store names
    firstName,
    lastName,
    middleName: middleName || "",
    emailAddress: emailAddress || "",
    workPhone: workPhone || "",
    workMobilePhone: workMobilePhone || "",
    alternatePhone: alternatePhone || "",
    fax: fax || "",
    title: title || "",
    updatedBy: req.user._id
  });

  // Populate and return the new contact
  const populatedContact = await ClientContacts.findById(newContact._id)
    .populate('clients', 'company website')
    .populate('updatedBy', 'fullName');

  return res.status(201).json(
    new ApiResponse(201, populatedContact, "Client contact created successfully")
  );
});

// Get all client contacts
const getAllClientContact = asyncHandler(async (req, res) => {
  const contacts = await ClientContacts.find()
    .populate('clients', 'company website')
    .populate('updatedBy', 'fullName');

  return res.status(200).json(
    new ApiResponse(200, contacts, "Client contacts retrieved successfully")
  );
});

// Get a single client contact
const getClientContact = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const contact = await ClientContacts.findById(id)
    .populate('clients', 'company website')
    .populate('updatedBy', 'fullName');

  if (!contact) {
    throw new ApiError(404, "Client contact not found");
  }

  return res.status(200).json(
    new ApiResponse(200, contact, "Client contact retrieved successfully")
  );
});

// Update a client contact
const updateClientContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    clients,
    firstName,
    lastName,
    middleName,
    emailAddress,
    workPhone,
    workMobilePhone,
    alternatePhone,
    fax,
    title
  } = req.body;

  const contact = await ClientContacts.findById(id);
  if (!contact) {
    throw new ApiError(404, "Client contact not found");
  }

  // Process clients if provided
  let clientIds = contact.clients;
  let clientNames = contact.clientNames;
  if (clients && Array.isArray(clients)) {
    try {
      // First try to find by ID
      const foundClients = await Client.find({ 
        _id: { $in: clients }
      });

      if (foundClients.length === clients.length) {
        // All found by ID
        clientIds = foundClients.map(client => client._id);
        clientNames = foundClients.map(client => client.company);
      } else {
        // If not all found by ID, try by company name
        const clientsByName = await Client.find({ 
          company: { $in: clients }
        });

        if (clientsByName.length !== clients.length) {
          throw new ApiError(404, "One or more clients not found");
        }

        clientIds = clientsByName.map(client => client._id);
        clientNames = clientsByName.map(client => client.company);
      }
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        // If cast error (invalid ObjectId), try finding by name directly
        const clientsByName = await Client.find({ 
          company: { $in: clients }
        });

        if (clientsByName.length !== clients.length) {
          throw new ApiError(404, "One or more clients not found");
        }

        clientIds = clientsByName.map(client => client._id);
        clientNames = clientsByName.map(client => client.company);
      } else {
        throw error;
      }
    }
  }

  // Update fields - set to empty string if provided as empty
  contact.clients = clientIds;
  contact.clientNames = clientNames;
  contact.firstName = firstName !== undefined ? firstName : contact.firstName;
  contact.lastName = lastName !== undefined ? lastName : contact.lastName;
  contact.middleName = middleName !== undefined ? middleName : contact.middleName;
  contact.emailAddress = emailAddress !== undefined ? emailAddress : contact.emailAddress;
  contact.workPhone = workPhone !== undefined ? workPhone : contact.workPhone;
  contact.workMobilePhone = workMobilePhone !== undefined ? workMobilePhone : contact.workMobilePhone;
  contact.alternatePhone = alternatePhone !== undefined ? alternatePhone : contact.alternatePhone;
  contact.fax = fax !== undefined ? fax : contact.fax;
  contact.title = title !== undefined ? title : contact.title;
  contact.updatedBy = req.user._id;

  const updatedContact = await contact.save();

  const populatedContact = await ClientContacts.findById(updatedContact._id)
    .populate('clients', 'company website')
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
