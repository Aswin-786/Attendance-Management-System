const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const SECRET_KEY = "ams";

// profile
router.get("/", (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        console.error("Error verifying JWT:", err);
        return res.status(401).json({ message: "Unauthorized" });
      }
      res.status(200).json({ info: decoded, token });
    });
  } else {
    res.status(403).json({ message: "No token provided" });
  }
});

module.exports = router;
