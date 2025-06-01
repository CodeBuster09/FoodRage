const CustomError = require("../utils/customError");

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return next(new CustomError("Access denied. Admins only.", 403));
  }
  next();
};