const AppError = require("../utils/appError");

const notFound = (req, _res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
};

const normalizeError = (error) => {
  if (error.name === "ValidationError") {
    const message = Object.values(error.errors)
      .map((item) => item.message)
      .join(", ");
    return new AppError(message || "Validation failed", 400);
  }

  if (error.code === 11000) {
    const duplicateField = Object.keys(error.keyPattern || {})[0] || "field";
    return new AppError(`${duplicateField} already exists`, 409);
  }

  if (error.name === "CastError") {
    return new AppError(`Invalid ${error.path}`, 400);
  }

  return error;
};

const errorHandler = (incomingError, _req, res, _next) => {
  const error = normalizeError(incomingError);
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: error.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
  });
};

module.exports = { notFound, errorHandler };
