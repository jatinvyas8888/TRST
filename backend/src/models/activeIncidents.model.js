import mongoose from 'mongoose';

// Define the schema for ActiveIncidents
const activeIncidentSchema = new mongoose.Schema({
    incident: {
        type: String,
        required: true,
    },
    incidentDate: {
        type: Date,
        required: true,
    },
    incidentType:[ {
        type: String,
        enum: [
            'Accident',
            'Criminal',
            'Cyber Security',
            'Facilities',
            'Fire',
            'HazMat',
            'Infrastructure',
            'Medical',
            'Natural Disaster',
            'Other',
            'Severe Weather',
            'Technology',
            'Workplace Violence'
        ],
        required: true,
    }],
    incidentDescription: {
        type: String,
        required: true,
    },
    severity: {
        type: String,
        enum: ['Critical', 'High', 'Medium', 'Low', 'Monitoring'],
        required: true,
    },
    incidentCommander: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model (no trailing space)
        default: [], // Allow empty array
    }],
    location: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location', // Reference to the Location model (no trailing space)
        default: [], // Allow empty array
    }],
    application: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application', // Reference to the Application model (no trailing space)
        default: [], // Allow empty array
    }],
    plans: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan', // Reference to the Plan model (no trailing space)
        default: [], // Allow empty array
    }],
    process: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Process', // Reference to the Process model (no trailing space)
        default: [], // Allow empty array
    }],
    vendors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendors', // Reference to the Vendors model (no trailing space)
        default: [], // Allow empty array
    }],
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

// Create the model from the schema
const ActiveIncident = mongoose.model('ActiveIncident', activeIncidentSchema);

export default ActiveIncident;