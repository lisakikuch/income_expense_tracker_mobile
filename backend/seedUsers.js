require('dotenv').config();

const mongoose = require('mongoose');
const faker = require('@faker-js/faker').faker;
const User = require('./models/userModel');

const MONGO_URI = process.env.MONGO_URI;

const seedUsers = async () => {
  try {
    await mongoose.connect(MONGO_URI,  { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const fakeUsers = [];

    for (let i = 0; i < 17; i++) {
      const email = faker.internet.email().toLowerCase();
      const password = 'password123'; // all users share a basic password
      const role = i === 0 ? 'Admin' : 'User'; // make the first user an admin

      fakeUsers.push(new User({ email, password, role }));
    }

    await User.insertMany(fakeUsers);
    console.log('Successfully created 17 fake users');

    mongoose.disconnect();
  } catch (err) {
    console.error('Error seeding users:', err);
    mongoose.disconnect();
  }
};

seedUsers();
