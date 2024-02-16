const mongoose = require('mongoose')
const { Schema, model } = mongoose

// Define schema for leave request
const leaveRequestSchema = new Schema({
  worker: { type: Schema.Types.ObjectId, ref: 'Worker', required: true },
  leaveDate: { type: String, required: true },
  type: { type: String, enum: ['full day', 'half day morning', 'half day afternoon'], required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
});

const leaveRequestModel = model('LeaveRequest', leaveRequestSchema)

module.exports = leaveRequestModel