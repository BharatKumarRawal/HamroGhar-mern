const express = require("express");
const router = express.Router();
const { verifyToken } = require("../utils/verifyuser");
const { createListing } = require("../controllers/listing.controller");

router.post("/create", createListing);

module.exports = router;
