import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";

export const validateRequest = (req, _res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return next(new ApiError(422, "Request validation failed", result.array()));
  }

  next();
};
