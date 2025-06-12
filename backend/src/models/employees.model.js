import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    // Work Contact Information
    employeeID: {
        type: String,
    },
    firstName: {
        type: String,
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
    },
    preferredName: {
        type: String
    },
    title: {
        type: String
    },
    timeZone: {
        type: String
    },
    workEmailAddress: {
        type: String,
    },
    workPhone: {
        type: String
    },
    workMobilePhone: {
        type: String
    },
    fax: {
        type: String
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
    subordinates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    }],
    employeeStatus: {
        type: String,
        enum: ['Active', 'Terminated']
    }, // Add statuses based on your app's needs

    // Organization
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location"
    },
    department: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "BusinessEntity"
    }],
    businessEntities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "BusinessEntity" // Reference to BusinessEntity model
      }],
    departmentNames: [{
        type: String
    }],

    // Personal Contact Information
    streetAddress1: {
        type: String
    },
    streetAddress2: {
        type: String
    },
    city: {
        type: String
    },
    zipPostalCode: {
        type: String
    },
    stateProvince: {
        type: String
    },
    country: {
        type: String
    },
    homePhoneNumber: {
        type: String
    },
    personalMobilePhone: {
        type: String
    },
    personalEmailAddress: {
        type: String
    },
    
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
