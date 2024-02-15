const mongoose = require('mongoose')
const { Schema, model } = mongoose

// Define schema for admin
const adminSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  
});

const adminModel = model('Admin', adminSchema)

module.exports = adminModel