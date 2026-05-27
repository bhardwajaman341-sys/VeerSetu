const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');

// @route   GET /api/donations/live
// @desc    Get the 10 most recent donations for the live ticker
router.get('/live', async (req, res) => {
  try {
    // Fetch donations, sort by newest first (createdAt: -1), limit to 10
    const recentDonations = await Donation.find().sort({ createdAt: -1 }).limit(10);
    res.json(recentDonations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error fetching live donations' });
  }
});

// @route   POST /api/donations
// @desc    Log a new donation into the transparency ledger
router.post('/', async (req, res) => {
  try {
    const newDonation = new Donation(req.body);
    const savedDonation = await newDonation.save();
    res.status(201).json(savedDonation);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid donation data' });
  }
});

module.exports = router;