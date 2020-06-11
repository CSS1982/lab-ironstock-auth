// models/value.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: [true, 'Username is required.'],
    unique: true
  },
  // add password property here
  passwordHash: {
    type: String,
    required: [true, 'Password is required.']
  },
  valueArray: [String]

}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;