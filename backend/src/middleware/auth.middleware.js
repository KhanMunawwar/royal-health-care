import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const authenticate = asyncHandler(async (req, _res, next) => {
  const authorization = req.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    throw new ApiError(401, "Authentication token is required");
  }

  const token = authorization.slice(7).trim();
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(payload.sub);

  if (!user || !user.isActive) {
    throw new ApiError(401, "User is unavailable or inactive");
  }

  req.user = user;
  next();
});

export const authorize = (...allowedRoles) => (req, _res, next) => {
  if (!allowedRoles.includes(req.user.role)) {
    return next(new ApiError(403, "You do not have permission for this action"));
  }
  next();
};
