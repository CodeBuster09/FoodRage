const cloudinary = require("../config/cloudinary.config.js");

const cloudinaryImageUpload = async (req, res, next) => {
  try {
    // Check if files and profileImage exist
    if (req.files && req.files.profileImage) {
      const result = await cloudinary.uploader.upload(
        req.files.profileImage.tempFilePath
      );
      req.imageData = {
        imageId: result.public_id,
        url: result.secure_url
      };
    }
    return next(); // continue even if no file is uploaded
  } catch (error) {
    return next(error);
  }
};

module.exports = cloudinaryImageUpload;
