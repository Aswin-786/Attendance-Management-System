const mongoose = require('mongoose')
const { Schema, model } = mongoose

// Define schema for attendance
const attendanceSchema = new Schema({
  worker: { type: Schema.Types.ObjectId, ref: 'Worker', required: true },
  date: { type: Date, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
});

const attendanceModel = model('Attendance', attendanceSchema)

module.exports = attendanceModel