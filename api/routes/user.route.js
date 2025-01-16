const express = require("express");
const router = express.Router();
const { verifyToken } = require("../utils/verifyuser");
const {
  test,
  updateUser,
  deleteUser,
  
} = require("../controllers/user.controller");

router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);


module.exports = router;
