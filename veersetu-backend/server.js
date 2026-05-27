const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes Mounted Here
app.use('/api/heroes', require('./routes/heroRoutes'));
app.use('/api/donations', require('./routes/donationRoutes'));
app.use('/api/admin/applications', require('./routes/applicationRoutes'));

// Basic health check route
app.get('/', (req, res) => {
  res.send('VeerSetu API is running securely!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});