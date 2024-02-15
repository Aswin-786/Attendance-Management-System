const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../../models/Admin");
const Staff = require("../../models/Staff");

const SECRET_KEY = "staff"; 

// Route for registering staff members
router.post("/", async (req, res) => {
  const { username, email, password, location } = req.body;

  try {
    // Check if email is already registered as admin
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Email is already registered as admin" });
    }

    // Check if email is already registered as staff
    const existingStaff = await Staff.findOne({ email });
    if (existingStaff) {
      return res.status(400).json({ message: "Email is already registered as staff" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new staff member
    const newStaff = await Staff.create({
      username,
      email,
      password: hashedPassword,
      location,
    });

    // Generate JWT token
    const token = jwt.sign({ staffId: newStaff._id, staffName: newStaff.username, role:'staff' }, SECRET_KEY);

    res.status(201).json({ message: "Staff registered successfully", token });
  } catch (error) {
    console.error("Error registering staff:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
