const express = require("express");
const router = express.Router();
const { authenticateUser, restrictToRole } = require('../../../middleware/authMiddleware');
const Attendance = require('../../../models/Attendance');
const LeaveRequest = require('../../../models/LeaveRequests');
const Staff = require("../../../models/Staff");

// Route to save attendance data
router.post("/attendance/:userId", authenticateUser, restrictToRole('staff'), async (req, res) => {
  const { userId } = req.params;
  const { date, checkIn, checkOut, totalHours } = req.body;
  try {
    // Check if there is an approved or pending leave request for this date
    const leaveRequest = await LeaveRequest.findOne({ worker: userId, leaveDate: date, status: { $in: ['accepted', 'pending'] } });
    if (leaveRequest) {
      return res.status(400).json({ message: "Attendance cannot be marked for a leave date" });
    }

    // Check if attendance data for this date already exists
    const existingAttendance = await Attendance.findOne({ worker: userId, date });
    if (existingAttendance) {
      return res.status(400).json({ message: "Attendance data for this date already exists" });
    }

    // Save new attendance data
    const newAttendance = new Attendance({
      worker: userId,
      date,
      checkIn,
      checkOut,
      totalHours,
    });
    await newAttendance.save();
    res.status(201).json({ message: "Attendance saved successfully" });
  } catch (error) {
    console.error("Error saving attendance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to submit leave request
router.post("/leave-request/:userId", authenticateUser, restrictToRole('staff'), async (req, res) => {
  const { userId } = req.params;
  const { leaveDate, type, reason } = req.body;
  try {
    // Check if leave request for this date already exists
    const existingLeaveRequest = await LeaveRequest.findOne({ worker: userId, leaveDate });
    if (existingLeaveRequest) {
      return res.status(400).json({ message: "Leave request for this date already exists" });
    }
    // Save new leave request
    const newLeaveRequest = await LeaveRequest.create({
      worker: userId,
      leaveDate,
      type,
      reason,
    });
    res.status(201).json({ message: "Leave request submitted successfully" });
  } catch (error) {
    console.error("Error submitting leave request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to get all leave requests for staff members
router.get("/leave-status/:userId", authenticateUser, restrictToRole('staff'), async (req, res) => {
  const { userId } = req.params;
  try {
    // Fetch leave requests for the specified user from the database
    const leaveRequests = await LeaveRequest.find({ worker: userId });
    res.status(200).json(leaveRequests);
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:userId", authenticateUser, async (req, res) => {
  try {
    // Get the user ID from the URL params
    const { userId } = req.params;
    // Fetch staff details for the specified user ID from the database
    const staffDetails = await Staff.findById(userId);    
    // Check if staff details were found
    if (!staffDetails) {
      return res.status(404).json({ message: "Staff details not found for this user" });
    }
    // Send the staff details as a response
    res.status(200).json(staffDetails);
  } catch (error) {
    console.error("Error fetching staff details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;