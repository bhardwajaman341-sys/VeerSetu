const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Hero = require('./models/Hero');
const Application = require('./models/Application');

// Load environment configurations
dotenv.config();

// Initialize the database connection
connectDB();

// Mock data mapping directly to your updated React client collections
const HEROES_SEED_DATA = [
  { 
    initials: "RS", 
    name: "Late Naib Subedar Rajendra Singh", 
    rank: "Naib Subedar", 
    unit: "4 Rajput Regiment", 
    state: "Rajasthan", 
    status: "Martyred", 
    need: "Child Education", 
    goal: 85000, 
    raised: 61200, 
    urgent: true, 
    training: false,
    family: "Wife + 2 children" 
  },
  { 
    initials: "PK", 
    name: "Hav. Pradeep Kumar (Retd.)", 
    rank: "Havildar (Veteran)", 
    unit: "Bihar Regiment", 
    state: "Bihar", 
    status: "Veteran", 
    need: "Medical Support", 
    goal: 60000, 
    raised: 47800, 
    urgent: false, 
    training: false,
    family: "Wife, mother" 
  },
  { 
    initials: "AM", 
    name: "Cadet Arjun Mehta (NDA, Injured)", 
    rank: "Cadet", 
    unit: "National Defence Academy", 
    state: "Maharashtra", 
    status: "Training Casualty", 
    need: "Rehabilitation", 
    goal: 40000, 
    raised: 18500, 
    urgent: true, 
    training: true, 
    family: "Parents" 
  }
];

const APPLICATIONS_SEED_DATA = [
  { id: "VS-0041", name: "Smt. Kamla Devi", type: "Martyr Family", state: "UP", docsUploaded: 3, totalDocs: 4, status: "pending" },
  { id: "VS-0042", name: "Ex-Hav. Mohan Rao", type: "Veteran", state: "AP", docsUploaded: 4, totalDocs: 4, status: "approved" },
  { id: "VS-0043", name: "Cadet Simran Kaur", type: "Training Casualty", state: "Punjab", docsUploaded: 2, totalDocs: 4, status: "flagged" }
];

const importData = async () => {
  try {
    // Clear out stale collections to avoid primary key/ID mapping collisions
    await Hero.deleteMany();
    await Application.deleteMany();
    
    // Seed new operational data items
    await Hero.insertMany(HEROES_SEED_DATA);
    
    // Map programmatic IDs to model format
    const formattedApps = APPLICATIONS_SEED_DATA.map(app => ({
      applicationId: app.id,
      name: app.name,
      type: app.type,
      state: app.state,
      docsUploaded: app.docsUploaded,
      totalDocs: app.totalDocs,
      status: app.status
    }));
    await Application.insertMany(formattedApps);
    
    console.log('✅ Operational collections seeded successfully into MongoDB Atlas!');
    process.exit(0);
  } catch (error) {
    console.error(`❌ Data seeding operation failed: ${error.message}`);
    process.exit(1);
  }
};

importData();