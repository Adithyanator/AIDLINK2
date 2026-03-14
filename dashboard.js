const express = require('express');
const router = express.Router();
const Camp = require('../models/Camp');
const Volunteer = require('../models/Volunteer');
const Donation = require('../models/Donation');
const NGOSupport = require('../models/NGOSupport');

// Get dashboard statistics
router.get('/', async (req, res) => {
  try {
    const totalCamps = await Camp.countDocuments();
    
    const camps = await Camp.find();
    let totalHostages = 0;
    let urgentCampsCount = 0;
    
    camps.forEach(camp => {
      totalHostages += camp.hostages || 0;
      if (camp.priority === 'Critical' || camp.priority === 'High') {
        urgentCampsCount++;
      }
    });

    const totalVolunteers = await Volunteer.countDocuments();
    const totalDonations = await Donation.countDocuments();
    const totalNGOSupport = await NGOSupport.countDocuments();

    res.json({
      totalCamps,
      totalHostages,
      urgentCampsCount,
      totalVolunteers,
      totalDonations,
      totalNGOSupport
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
