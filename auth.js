const express = require('express');
const router = express.Router();
const WardMember = require('../models/WardMember');

// Login a ward member
router.post('/login', async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const member = await WardMember.findOne({ phoneNumber });
    
    if (!member) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    if (member.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful', member });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
