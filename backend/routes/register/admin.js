const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../../models/Admin");
const Staff = require("../../models/Staff");

const SECRET_KEY = "admin"; 

// Route for registering administrators
router.post("/", async (req, res) => {
  const { username, email, password, adminKey } = req.body;
  // Check if admin key is valid , for protecting the admin 
  if (adminKey !== "abcd") {
    return res.status(400).json({ message: "Invalid admin key" });
  }

  try {
    // Check email is already registered as admin
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Email is already registered as admin" });
    }

    // Check  email is already registered as staff
    const existingStaff = await Staff.findOne({ email });
    if (existingStaff) {
      return res.status(400).json({ message: "Email is already registered as staff" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin
    const newAdmin = await Admin.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign({ adminId: newAdmin._id , adminName:newAdmin.username, role:'admin'}, SECRET_KEY);

    res.status(201).json({ message: "Admin registered successfully", token });
  } catch (error) {
    console.error("Error registering admin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
