import { Doctor } from "../models/Doctor.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const listDoctors = asyncHandler(async (req, res) => {
  const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(Number.parseInt(req.query.limit, 10) || 10, 1), 50);
  const filter = { isVerified: true };

  if (req.query.specialization) {
    filter.specializations = req.query.specialization.trim();
  }

  const [doctors, total] = await Promise.all([
    Doctor.find(filter)
      .populate("user", "name email phone")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Doctor.countDocuments(filter)
  ]);

  res.json({
    success: true,
    data: doctors,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) }
  });
});

export const getDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findOne({ _id: req.params.id, isVerified: true }).populate(
    "user",
    "name email phone"
  );

  if (!doctor) throw new ApiError(404, "Doctor not found");
  res.json({ success: true, data: doctor });
});
