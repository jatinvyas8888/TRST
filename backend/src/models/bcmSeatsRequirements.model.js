import mongoose, { Types } from 'mongoose';

const bcmSeatsRequirementsSchema = new mongoose.Schema(
  {
    //BCM Seats Requirement Information
    bcmSeatsRequirements: {
      type: String,
    },
    bcmSeatsRequirementsRecovery: {
      type: String,
    },
    activities: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Activity',
    }],
    timeOfOperation: { // Updated field name to match frontend
      type: String,
    },
    bcmSeatNumber: {
      type: Number,
    },
    bcmSite: { // Ensure this matches the frontend
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
    },

    //primary staff
    primaryCriticalStaff: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
    }],
    //secondary Staff
    alternateCriticalStaff: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
    }],
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { 
    timestamps: true
  }
);

const BCMSeatsRequirements = mongoose.model('BCMSeatsRequirements', bcmSeatsRequirementsSchema);

export default BCMSeatsRequirements;