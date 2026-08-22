import { ApiError } from "../utils/ApiError.js";

export const notFound = (req, _res, next) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};

export const errorHandler = (error, _req, res, _next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Internal server error";
  let details = error.details;

  if (error.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource identifier";
  }

  if (error.code === 11000) {
    statusCode = 409;
    message = `Duplicate value for: ${Object.keys(error.keyPattern || {}).join(", ")}`;
  }

  if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Invalid or expired authentication token";
  }

  if (error.name === "ValidationError") {
    statusCode = 400;
    message = "Database validation failed";
    details = Object.values(error.errors).map((item) => item.message);
  }

  const response = { success: false, message };
  if (details) response.details = details;
  if (process.env.NODE_ENV !== "production") response.stack = error.stack;

  res.status(statusCode).json(response);
};
