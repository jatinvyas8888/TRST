import express from 'express';
import { createVendorContact, getAllVendorContacts } from '../controllers/vendorContact.controller.js';

const router = express.Router();

// Route to create a new vendor contact
router.post('/create', createVendorContact);

// Route to get all vendor contacts
router.get('/getall', getAllVendorContacts);

export default router;