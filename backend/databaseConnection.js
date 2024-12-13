const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    if (!process.env.MONGO_DB) {
      throw new Error('MONGO_DB environment variable is not defined');
    }
    
    await mongoose.connect(process.env.MONGO_DB);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;