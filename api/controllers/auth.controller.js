const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const errorHandler = require("../utils/error.js");
const jwt = require("jsonwebtoken");
const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    next(err);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email);
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const isValidPassword = bcrypt.compareSync(password, validUser.password);
    if (!isValidPassword) {
      return next(errorHandler(401, "Invalid credentials"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 1000,
    });
    const { password: pass, ...user } = validUser._doc;
    res.status(200).json({ message: "User logged in successfully", user });
  } catch (error) {
    next(error);
  }
};

const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      console.log("-----camer here first");
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 12 * 60 * 60 * 1000,
      });
      const { password: pass, ...userdata } = user._doc;
      console.log("User data", userdata);
      res
        .status(200)
        .json({ message: "User logged in successfully", userdata });
    } else {
      console.log("-----camer here");
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.floor(Math.random() * 1000),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 12 * 60 * 60 * 1000,
      });

      const { password: pass, ...userdata } = newUser._doc;
      res.status(201).json({ message: "User created successfully", userdata });
    }
  } catch (error) {
    next(error);
  }
};
const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Signout successfully" });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  signup,
  signin,
  google,
  signOut,
};
