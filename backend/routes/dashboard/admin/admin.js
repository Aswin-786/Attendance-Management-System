const express = require("express");
const router = express.Router();
const { authenticateUser, restrictToRole } = require('../../../middleware/authMiddleware');
const Attendance = require('../../../models/Attendance');
const LeaveRequest = require('../../../models/LeaveRequests');
const Staff = require("../../../models/Staff");

// Route to save attendance data
router.post("/attendance/:userId", authenticateUser, restrictToRole('admin'), async (req, res) => {

  const { userId } = req.params;
  const { date, checkIn, checkOut, totalHours } = req.body;

  try {
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

// Route to fetch all staff details
router.get("/staffdetails", authenticateUser, restrictToRole('admin') , async (req, res) => {
  try {
    // Fetch all staff documents from the database
    const staffDetails = await Staff.find({}, "-password"); // Exclude the password field from the response

    // Check if staff details were found
    if (staffDetails.length === 0) {
      return res.status(404).json({ message: "No staff details found" });
    }

    // Send the staff details as a response
    res.status(200).json(staffDetails);
  } catch (error) {
    console.error("Error fetching staff details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.put("/leavestatus/:userId", authenticateUser, restrictToRole('admin'), async (req, res) => {
  const { userId } = req.params;
  const { status } = req.body;

  try {
    // Find the worker based on the user ID
    const worker = await Staff.findById(userId);
    if (!worker) {
      return res.status(404).json({ message: "Worker not found for this user" });
    }

    // Find and update the leave request status for the worker
    await LeaveRequest.updateMany({ worker: worker._id }, { $set: { status } });

    res.status(200).json({ message: "Leave request status updated successfully" });
  } catch (error) {
    console.error("Error updating leave request status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to fetch leave statuses with status 'pending'
router.get("/leavestatus", authenticateUser, restrictToRole('admin'), async (req, res) => {
  try {
    // Fetch leave requests with status 'pending'
    const leaveRequests = await LeaveRequest.find().populate('worker', 'username');


    res.status(200).json(leaveRequests);
  } catch (error) {
    console.error("Error fetching pending leave status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});




module.exports = router;

