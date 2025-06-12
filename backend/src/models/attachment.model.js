import mongoose from "mongoose";

const attachmentSchema = new mongoose.Schema(
  {
    order: {
      type: Number,
      required: true,
    },
    attachmentName: {
      type: String,
      required: true,
    },
    includeInPlan: {
      type: Boolean,
      default: false,
    },
    isFromTemplate: {
      type: Boolean,
      default: false,
    },
    documentFile: {
      type: String, // File path or URL
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Attachment = mongoose.model("Attachment", attachmentSchema);

export default Attachment;