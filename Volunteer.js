const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  district: { type: String, required: true },
  area: { type: String, required: true },
  skills: [{ type: String, required: true }],
}, { timestamps: true });

module.exports = mongoose.model('Volunteer', volunteerSchema);
