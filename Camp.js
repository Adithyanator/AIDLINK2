const mongoose = require('mongoose');

const campSchema = new mongoose.Schema({
  name: { type: String, required: true },
  district: { type: String, required: true },
  ward: { type: String, required: true },
  address: { type: String, required: true },
  contactNumber: { type: String, required: true },
  hostages: { type: Number, default: 0 },
  capacity: { type: Number, default: 0 },
  resourceNeeds: [{ type: String }],
  priority: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Low' },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true }
}, { timestamps: true });

// Auto-calculate priority based on hostages and needs before saving
campSchema.pre('save', function(next) {
  if (this.resourceNeeds && this.resourceNeeds.length > 2 || this.hostages > 200) {
    this.priority = 'Critical';
  } else if (this.hostages > 50 || this.resourceNeeds.length > 0) {
    this.priority = 'Medium';
  } else {
    this.priority = 'Low';
  }
  next();
});

module.exports = mongoose.model('Camp', campSchema);
