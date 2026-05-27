const express = require('express');
const router = express.Router();
const Hero = require('../models/Hero');

// @route   GET /api/heroes
// @desc    Fetch all verified families and training casualties
router.get('/', async (req, res) => {
  try {
    const heroes = await Hero.find();
    res.json(heroes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error fetching heroes' });
  }
});

// @route   PUT /api/heroes/:id/donate
// @desc    Process a donation and increase the raised amount
router.put('/:id/donate', async (req, res) => {
  try {
    const { amount } = req.body;
    const hero = await Hero.findById(req.params.id);
    
    if (!hero) {
      return res.status(404).json({ message: 'Family not found' });
    }

    hero.raised += Number(amount);
    const updatedHero = await hero.save();
    
    res.json(updatedHero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error processing donation' });
  }
});

module.exports = router;