const express = require('express');
const router = express.Router();
const Camp = require('../models/Camp');

// Get all camps
router.get('/', async (req, res) => {
  try {
    const camps = await Camp.find();
    res.json(camps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new camp
router.post('/', async (req, res) => {
  try {
    const newCamp = new Camp(req.body);
    const savedCamp = await newCamp.save();
    res.status(201).json(savedCamp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a camp (e.g. increase hostages, add resource needs)
router.put('/:id', async (req, res) => {
  try {
    const updatedCamp = await Camp.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true, runValidators: true }
    );
    res.json(updatedCamp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
