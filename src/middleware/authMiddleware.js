const jwt = require("jsonwebtoken");

const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");

const protect = asyncHandler(async (req, _res, next) => {
  const authHeader = req.headers.authorization || "";
  const token =
    req.cookies.token ||
    (authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null);

  if (!token) {
    throw new AppError("Authentication required", 401);
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET || "super-secret-key");
  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    throw new AppError("User not found", 401);
  }

  req.user = user;
  next();
});

const authorize = (...roles) => (req, _res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    next(new AppError("You do not have permission to access this resource", 403));
    return;
  }

  next();
};

module.exports = { protect, authorize };
