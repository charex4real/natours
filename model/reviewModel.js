const mongoose = require('mongoose');
const User = require('./userModel');

const tourSchema = new mongoose.Schema({

  review: {
    type: String,
    required: [true, 'Review cannot be empty'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Rating must be between 1 and 5'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),  
  },
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'Review must belong to a tour'],
  }
  user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user']
    }
});