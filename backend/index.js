const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const mongoose = require("mongoose");
const { authenticateUser, restrictToRole } = require('./middleware/authMiddleware');
const staffRouter = require("./routes/dashboard/staff/staff");
const adminRouter = require("./routes/dashboard/admin/admin");
const app = express();

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

const mongoUrl = process.env.MONGO;
if (!mongoUrl) {
  console.error("wrong mongo url");
  process.exit(1);
}
mongoose.connect(mongoUrl);

//admin register
app.use("/register/admin", require("./routes/register/admin"));

// Register/Staff route
app.use("/register/staff", require("./routes/register/staff"));

// Login/Admin route
app.use("/login/admin", require("./routes/login/admin"));

// Login/Staff route
app.use("/login/staff", require("./routes/login/staff"));

//for checking the user
app.use("/profile", authenticateUser, require("./routes/profile/profile"));

//for all dashboard for staff
app.use("/dashboard/staff", staffRouter);

//for all dashboard for admin
app.use("/dashboard/admin", adminRouter);

//for test
app.get("/", (req, res) => {
  res.status(200).json({ message: "test" });
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
