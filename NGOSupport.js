const mongoose = require('mongoose');

const ngoSupportSchema = new mongoose.Schema({
  organizationName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  district: { type: String, required: true },
  supportType: { type: String, required: true }, // e.g., food supply, medical team
  capacity: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('NGOSupport', ngoSupportSchema);
