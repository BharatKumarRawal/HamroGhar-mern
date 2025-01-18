const Listing = require("../models/listing.model");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const errorHandler = require("../utils/error");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
const createListing = async (req, res, next) => {
  console.log("Create API");
  try {
    const {
      name,
      description,
      address,
      regularPrice,
      discountedPrice,
      bathrooms,
      bedrooms,
      furnished,
      parking,
      sell,
      rent,
      userRef,
    } = req.body;
    console.log(userRef);
    // if (req.user.id !== userRef) {
    //   return next(errorHandler(401, "Unauthorized"));
    // }

    //let us handle the image upload first
    const files = req.files?.images;
    if (!files) {
      return res.status(400).json({ error: "Images are required" });
    }

    //Ensuring files are in array format
    const fileArray = Array.isArray(files) ? files : [files];

    //Uploading images to cloudinary
    const imageUrls = await Promise.all(
      fileArray.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.tempFilePath);
        return result.url;
      })
    );
    //creating the new listing
    const newListing = await Listing.create({
      name,
      description,
      address,
      regularPrice,
      discountedPrice,
      bathrooms,
      bedrooms,
      furnished,
      parking,
      sell,
      rent,
      userRef,
      images: imageUrls,
    });
    return res.status(201).json({
      success: true,
      listing: newListing,
      message: "Listing created successfully",
    });
  } catch (error) {
    next(error);
  }
  // console.log(req.body);
  // if (!req.files || !req.files.images) {
  //   return res.status(400).json({ error: "Images are required" });
  // }
  // const file = req.files.images;
  // cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
  //   console.log(result);
  // });

  // try {
  //   const listing = await Listing.create(req.body);
  //   return res.status(201).json({
  //     success: true,
  //     listing,
  //     message: "Listing created successfully",
  //   });
  // } catch (error) {
  //   next(error);
  // }
};

module.exports = { createListing };
