require('dotenv').config();
const mongoose = require('mongoose');
const Camp = require('./models/Camp');
const WardMember = require('./models/WardMember');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/aidlink';

const sampleCamps = [
  {
    name: 'Govt Model Boys HSS',
    district: 'Trivandrum',
    ward: '12',
    address: 'Thycaud, Trivandrum, Kerala 695014',
    contactNumber: '9876543210',
    hostages: 250,
    capacity: 500,
    resourceNeeds: ['Food', 'Medical Aid', 'Blankets'],
    lat: 8.4875,
    lng: 76.9525
  },
  {
    name: 'St. Marys School Relief Camp',
    district: 'Ernakulam',
    ward: '5',
    address: 'Marine Drive, Kochi, Kerala 682031',
    contactNumber: '9123456789',
    hostages: 80,
    capacity: 200,
    resourceNeeds: ['Water', 'Clothes'],
    lat: 9.9816,
    lng: 76.2999
  },
  {
    name: 'Alappuzha SDV School',
    district: 'Alappuzha',
    ward: '8',
    address: 'Sanathanapuram, Alappuzha, Kerala 688003',
    contactNumber: '9988776655',
    hostages: 400,
    capacity: 1000,
    resourceNeeds: ['Evacuation support', 'Food', 'Water', 'Medical Aid'],
    lat: 9.4981,
    lng: 76.3388
  },
  {
    name: 'Wayanad Community Hall',
    district: 'Wayanad',
    ward: '3',
    address: 'Kalpetta, Wayanad, Kerala 673121',
    contactNumber: '9900112233',
    hostages: 45,
    capacity: 100,
    resourceNeeds: ['Shelter', 'Blankets'],
    lat: 11.6103,
    lng: 76.0828
  },
  {
    name: 'Thrissur Town Hall Camp',
    district: 'Thrissur',
    ward: '1',
    address: 'Palace Road, Thrissur, Kerala 680020',
    contactNumber: '9876123450',
    hostages: 150,
    capacity: 300,
    resourceNeeds: ['Food', 'Water', 'Medicines'],
    lat: 10.5276,
    lng: 76.2144
  }
];

const sampleWardMembers = [
  {
    name: 'Rajesh Kumar',
    wardNumber: '1',
    phoneNumber: '9876543210',
    district: 'Trivandrum',
    password: 'password123'
  },
  {
    name: 'Anita Nair',
    wardNumber: '5',
    phoneNumber: '9123456789',
    district: 'Ernakulam',
    password: 'password123'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to DB for seeding...');
    
    // Clear out existing data
    await Camp.deleteMany({});
    await WardMember.deleteMany({});
    
    console.log('Inserting camps...');
    for (const camp of sampleCamps) {
      const newCamp = new Camp(camp);
      // Priority is auto-calculated on save via mongoose pre-hook
      await newCamp.save();
    }
    
    console.log('Inserting ward members...');
    await WardMember.insertMany(sampleWardMembers);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding DB:', err);
    process.exit(1);
  }
};

seedDB();
