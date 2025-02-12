import serviceType from '../models/serviceType.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

// Log the serviceType to check its structure
console.log('serviceType:', serviceType);

const createServiceType = async (req, res) => {
    try {
        const newServiceType = await serviceType.create(req.body);
        res.status(201).json(new ApiResponse(201, newServiceType, 'Service type created successfully'));
    } catch (error) {
        console.error('Error creating service type:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getAllServiceTypes = async (req, res) => {
    try {
        const serviceTypes = await serviceType.find();
        return res.status(200).json(new ApiResponse(200, serviceTypes, 'Service types fetched successfully'));
    } catch (error) {
        console.error('Error fetching service types:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getServiceTypeById = async (req, res) => {
    const { id } = req.params;
    try {
        const foundServiceType = await serviceType.findById(id);
        if (!foundServiceType) {
            throw new ApiError(404, 'Service type not found');
        }
        return res.status(200).json(new ApiResponse(200, foundServiceType, 'Service type fetched successfully'));
    } catch (error) {
        console.error('Error fetching service type:', error);
        res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
    }
};

const updateServiceType = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedServiceType = await serviceType.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedServiceType) {
            throw new ApiError(404, 'Service type not found');
        }
        res.status(200).json(new ApiResponse(200, updatedServiceType, 'Service type updated successfully'));
    } catch (error) {
        console.error('Error updating service type:', error);
        res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
    }
};

const deleteServiceType = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedServiceType = await serviceType.findByIdAndDelete(id);
        if (!deletedServiceType) {
            throw new ApiError(404, 'Service type not found');
        }
        res.status(200).json(new ApiResponse(200, deletedServiceType, 'Service type deleted successfully'));
    } catch (error) {
        console.error('Error deleting service type:', error);
        res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
    }
};

export {
    createServiceType,
    getAllServiceTypes,
    getServiceTypeById,
    updateServiceType,
    deleteServiceType,
};
