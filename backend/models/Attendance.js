const mongoose = require('mongoose')
const { Schema, model } = mongoose

// Define schema for attendance
const attendanceSchema = new Schema({
  worker: { type: Schema.Types.ObjectId, ref: 'Worker', required: true },
  date: { type: String, required: true },
  checkIn: { type: String, required: true },
  checkOut: { type: String, required: true },
  totalHours: { type: Number, required: true }
});

const attendanceModel = model('Attendance', attendanceSchema)

module.exports = attendanceModel