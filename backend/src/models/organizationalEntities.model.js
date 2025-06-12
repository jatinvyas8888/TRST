import mongoose from "mongoose"

// Define the allowed business entity types
// const BUSINESS_ENTITY_TYPES = ['Company', 'Business Unit', 'Division', 'Department'];

const businessEntitySchema = new mongoose.Schema({
    businessEntityType: {
        type: String,
        required: false,
        trim: true
    },
    businessEntity: {
        type: String,
        required: false,
        unique: true,
        trim: true
    },
    businessEntityId: {
        type: String,
        required: false,
    },
    editors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default:[]
    }],
    description: {
        type: String,
        required: false,
    },
    parentBusinessEntity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BusinessEntity",
        default:[]
    },
    childBusinessEntities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "BusinessEntity",
        default:[]
    }],
    relatedLocations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        default:[]
    }],
    employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        default:[]
    }],
    locations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        default:[]
    }],
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
        default:[]
    }],
    applicationIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' , default:[]}],
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    
    }
}, {
    timestamps: true
})

// Update the updatedAt timestamp before saving
businessEntitySchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

export const BusinessEntity = mongoose.model("BusinessEntity", businessEntitySchema)

// export { BUSINESS_ENTITY_TYPES };