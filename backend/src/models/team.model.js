import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema(
  {
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plan',
      required: true,
    },
    applications: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
    }],
    team: {
      type: String,
      required: true,
    },
    teamDescription: {
      type: String,
      required: true,
    },
    teamType: {
      type: String,
      enum: ['Facility Managers', 'First Responder', 'Recovery', 'Restoration'],
      required: true,
    },
    teamMembers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
    }],
  },
  { timestamps: true }
);

const Team = mongoose.model('Team', teamSchema);

export default Team;