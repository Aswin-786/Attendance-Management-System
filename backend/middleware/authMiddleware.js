const jwt = require("jsonwebtoken");
const SECRET_KEY = "ams";

// Middleware for authenticating users
const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      //setting the user information
      req.user = decoded; 
      console.log(req.user);
      next();
    });
  } else {
    res.status(403).json({ message: "No token provided" });
  }
};

// Middleware for restricting access based on role
const restrictToRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next(); 
    } else {
      res.status(403).json({ message: "Forbidden" }); 
    }
  };
};

module.exports = {
  authenticateUser,
  restrictToRole,
};
