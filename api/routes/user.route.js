const express = require("express");
const router = express.Router();
const { verifyToken } = require("../utils/verifyuser");
const { test, updateUser } = require("../controllers/user.controller");

router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);

module.exports = router;
