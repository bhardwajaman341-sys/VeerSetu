const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  applicationId: { type: String, required: true, unique: true }, // E.g., 'VS-0041'
  name: { type: String, required: true }, // Name of the applicant
  type: { type: String, required: true }, // E.g., 'Martyr Family', 'Veteran'
  state: { type: String, required: true },
  docsUploaded: { type: Number, default: 0 },
  totalDocs: { type: Number, default: 4 },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'flagged', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Application', applicationSchema);