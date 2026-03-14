const mongoose = require('mongoose');

const wardMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  wardNumber: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  district: { type: String, required: true },
  password: { type: String, required: true } // Storing plainly for demo simplicity, or simple hash
}, { timestamps: true });

module.exports = mongoose.model('WardMember', wardMemberSchema);
