import mongoose from "mongoose"

const locationSchema = new mongoose.Schema({
    locationName: {
        type: String,
    },
    locationType: {
        type: String,
    },
    locationId: {
        type: String,
    },
    mainPhone: {
        type: String,
    },
    capacity: {
        type: Number,
        default: 0
    },
    capacityUsed: {
        type: Number,
        default: 0
    },
    latitude: {
        type: String,
        default: null
    },
    longitude: {
        type: String,
        default: null
    }, 
    siteOwnership: {
        type: String,
    },
    siteManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
    accessSafetySecurityEquipment: {
        type: String,
        default: ""
    },
    streetAddress1: {
        type: String,
    },
    streetAddress2: {
        type: String,
    },
    city: {
        type: String,
    },
    stateProvince: {
        type: String,
    },
    zipPostalCode: {
        type: String,
    },
    country: {
        type: String,
    },
    parentLocation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location"
    },
    childLocations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location"
    }],
    businessEntities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "BusinessEntity"
    }],
}, {
    timestamps: true
})

const Location = mongoose.model("Location", locationSchema)

export default Location