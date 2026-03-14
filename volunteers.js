const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');

// Get all volunteers
router.get('/', async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Register new volunteer
router.post('/', async (req, res) => {
  try {
    const newVolunteer = new Volunteer(req.body);
    const saved = await newVolunteer.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
