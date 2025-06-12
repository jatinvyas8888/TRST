// src/models/plan.model.js
// import mongoose, { Schema, model } from 'mongoose';
import mongoose, { Schema, model } from 'mongoose';
// import mongoose, { Schema } from 'mongoose';
const PlanSchema = new Schema(
  {
    plan_name: { type: String, required: true },
    plan_leader: [{ type: Schema.Types.ObjectId, ref: 'Employee', default: [] }],
    plan_editors: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }], // Removed extra space
    plan_type: {
      type: String,
      enum: [
        'Application Recovery Plan',
        'Business Continuity Plan',
        'Crisis Management Plan',
        'Custom Plan',
        'Cyber Incident Response Plan',
        'Data Center Recovery Plan',
        'Emergency Response Plan',
        'Infrastructure Recovery Plan',
        'Pandemic Response Plan',
      ],
      required: true,
    },
    business_entity: [{ type: Schema.Types.ObjectId, ref: 'BusinessEntity', default: [] }],
    location: [{ type: Schema.Types.ObjectId, ref: 'Location', default: [] }],
    process: [{ type: Schema.Types.ObjectId, ref: 'Process', default: [] }],
    application: [{ type: Schema.Types.ObjectId, ref: 'Application', default: [] }],
    hardware: [{ type: Schema.Types.ObjectId, ref: 'Hardware', default: [] }],
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

const Plan = model('Plan', PlanSchema);

export default Plan;