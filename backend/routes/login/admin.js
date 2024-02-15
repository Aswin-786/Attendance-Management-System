const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../../models/Admin");

const SECRET_KEY = "ams";

// Route for admin login
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the username exists in the database
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, admin.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ adminId: admin._id, adminName: admin.username, role:'admin' }, SECRET_KEY);

    res.status(200).json({
      message: "Admin logged in successfully", token, userName: admin.username, userId: admin._id, role: 'admin'});
  } catch (error) {
    console.error("Error logging in admin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
