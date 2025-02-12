import mongoose from 'mongoose';

const clientContactsSchema = new mongoose.Schema(
  {
    clients: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
    }],
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    middleName: {
      type: String,
    },
    title:{
      type: String,
    },
    emailAddress: {
      type: String,
    },
    workPhone: {
      type: String,
    },
    workMobilePhone: {
      type: String,
    },
    alternatePhone: {
      type: String,
    },
    fax: {
      type: String,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const ClientContacts = mongoose.model('ClientContacts', clientContactsSchema);

export default ClientContacts;
