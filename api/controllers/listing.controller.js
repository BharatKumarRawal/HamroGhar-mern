const Listing = require("../models/listing.model");
const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json({
      success: true,
      listing,
      message: "Listing created successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createListing };
