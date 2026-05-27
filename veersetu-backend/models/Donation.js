const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donor: { type: String, default: 'Anonymous' },
  amount: { type: Number, required: true },
  family: { type: String, required: true }, // Name of the family receiving the fund
  type: { 
    type: String, 
    enum: ['education', 'medical', 'ration', 'emergency', 'general'],
    default: 'general'
  }
}, {
  timestamps: true // This will automatically log the time of the donation
});

module.exports = mongoose.model('Donation', donationSchema);