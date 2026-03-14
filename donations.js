const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const NGOSupport = require('../models/NGOSupport');

// Register individual donation
router.post('/individual', async (req, res) => {
  try {
    const newDonation = new Donation(req.body);
    const saved = await newDonation.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Register NGO support
router.post('/ngo', async (req, res) => {
  try {
    const newNGO = new NGOSupport(req.body);
    const saved = await newNGO.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
