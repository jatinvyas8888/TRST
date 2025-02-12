import mongoose from "mongoose";

const serviceTypeSchema = new mongoose.Schema({
    serviceType: {
        type: String
    }

},
{timestamps: true})

const serviceType = mongoose.model('serviceType', serviceTypeSchema);

export default serviceType;
