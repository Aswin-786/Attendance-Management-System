const mongoose = require('mongoose')
const { Schema, model } = mongoose

  // Define schema for worker
const staffSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    location: { type: String, required: true },
  });
const staffModel = model('Staff', staffSchema)

module.exports = staffModel