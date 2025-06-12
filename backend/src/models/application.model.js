// backend/src/models/application.model.js
import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    applicationID: {
        type: String,
        required: true,
        unique: true,
    },
    applicationName: {
        type: String,
        required: true,
    },
    applicationType: {
        type: String, // Array of strings for multiple selection
       
        required: true,
    },
    applicationAlias: {
        type: String,
    },
    applicationURL: {
        type: String,
    },
    description: {
        type: String,
    },
    hostedType: {
        type: String,
        required: true
    },
    applicationOwner: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Refers to User collection
      }],
      applicationVendor:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor', // Refers to Vendor collection
        default: null, // ✅ Allow null if no vendor is selected
      }],
    businessOwner: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee', // Refers to Employee collection
      }],
      businessEntity:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BusinessEntity', // Refers to Business Entity collection
      }],
      primaryDataCenter: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location', // Refers to Location collection
      }],
      alternateDataCenter: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location', // Refers to Location collection
      }],    
    drStrategy: {
        type: String,
        default: null, // ✅ Allow null if no vendor is selected
       
    },
    rto: {
        type: String,
        default: null, // ✅ Allow null if no vendor is selected
       
    },
    rpo: {
        type: String,
        default: null, // ✅ Allow null if no vendor is selected
       
    },
    //relationship with bussiness entity
    businessEntityRelationship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BusinessEntity"
  },
  businessEntity_app: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BusinessEntity", // 👈 make sure this is correct model name
  },
  
}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);

export default Application;