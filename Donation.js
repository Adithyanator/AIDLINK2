const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donorName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  district: { type: String, required: true },
  itemDonated: { type: String, required: true },
  quantity: { type: String, required: true },
  preferredCamp: { type: mongoose.Schema.Types.ObjectId, ref: 'Camp' } // optional
}, { timestamps: true });

module.exports = mongoose.model('Donation', donationSchema);
