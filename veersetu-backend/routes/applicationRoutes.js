const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

// @route   GET /api/admin/applications
// @desc    Get all pending and flagged family applications
router.get('/', async (req, res) => {
  try {
    const applications = await Application.find();
    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error fetching applications' });
  }
});

module.exports = router;