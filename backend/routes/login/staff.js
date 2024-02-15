const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Staff = require("../../models/Staff");

const SECRET_KEY = "ams";

// Route for staff login
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the username exists in the database
    const staff = await Staff.findOne({ email });
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, staff.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ staffId: staff._id, staffName:staff.username, role:'staff' }, SECRET_KEY);

    res.status(200).json({ message: "Staff logged in successfully", token, userName: staff.username, userId: staff._id, role: 'staff', });
  } catch (error) {
    console.error("Error logging in staff:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
