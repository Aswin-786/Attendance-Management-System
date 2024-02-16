const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser");
// const userRouter = require("./routes/user");
// const postRouter = require("./routes/post");
const { authenticateUser, restrictToRole } = require('./middleware/authMiddleware');
const staffRouter = require("./routes/dashboard/staff/staff");
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


app.use("/register/admin", require("./routes/register/admin"));

// Register/Staff route
app.use("/register/staff", require("./routes/register/staff"));

// Login/Admin route
app.use("/login/admin", require("./routes/login/admin"));

// Login/Staff route
app.use("/login/staff", require("./routes/login/staff"));

app.use("/profile", authenticateUser, require("./routes/profile/profile"));

app.use("/dashboard/staff", staffRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "test test 10" });
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
