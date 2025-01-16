const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  google,
  signOut,
} = require("../controllers/auth.controller");
router.post("/signup", signup);
router.post("/login", signin);
router.post("/google", google);
router.get("/logout", signOut);

module.exports = router;
