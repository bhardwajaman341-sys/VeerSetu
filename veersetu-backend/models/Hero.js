const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  initials: { type: String, required: true },
  name: { type: String, required: true },
  rank: { type: String, required: true },
  unit: { type: String, required: true }, // Changed from regiment to unit
  state: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Martyred', 'Veteran', 'Training Casualty'],
    required: true 
  },
  need: { type: String, required: true }, // E.g., 'Child Education', 'Medical Support'
  goal: { type: Number, required: true },
  raised: { type: Number, default: 0 },
  urgent: { type: Boolean, default: false },
  training: { type: Boolean, default: false },
  family: { type: String, required: true }
}, {
  timestamps: true 
});

module.exports = mongoose.model('Hero', heroSchema);