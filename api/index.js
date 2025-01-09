const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;
const dotenv = require("dotenv");
const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");
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
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}!!`);
});