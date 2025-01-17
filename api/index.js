const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");
const listingRouter = require("./routes/listing.route");
dotenv.config();

mongoose
  .connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB!!");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}!!`);
});
app.use(cookieParser());
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ success: false, message, statusCode });
});
