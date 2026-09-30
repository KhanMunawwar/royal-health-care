import mongoose from "mongoose";

import { Doctor } from "../models/Doctor.js";
import { User } from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getPagination = (query) => {
  const page = Math.max(Number.parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(
    Math.max(Number.parseInt(query.limit, 10) || 10, 1),
    50
  );

  return { page, limit };
};

const populateDoctorUser = (query) =>
  query.populate("user", "name email phone role isActive");

export const listDoctors = asyncHandler(async (req, res) => {
  const { page, limit } = getPagination(req.query);
  const filter = { isVerified: true };

  if (req.query.specialization) {
    filter.specializations = req.query.specialization.trim();
  }

  const [doctors, total] = await Promise.all([
    populateDoctorUser(
      Doctor.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
    ),
    Doctor.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: doctors,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
});

export const listAllDoctors = asyncHandler(async (req, res) => {
  const { page, limit } = getPagination(req.query);
  const filter = {};

  if (req.query.specialization) {
    filter.specializations = req.query.specialization.trim();
  }

  if (req.query.isVerified === "true") filter.isVerified = true;
  if (req.query.isVerified === "false") filter.isVerified = false;

  const [doctors, total] = await Promise.all([
    populateDoctorUser(
      Doctor.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
    ),
    Doctor.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: doctors,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
});

export const getDoctor = asyncHandler(async (req, res) => {
  const doctor = await populateDoctorUser(
    Doctor.findOne({
      _id: req.params.id,
      isVerified: true,
    })
  );

  if (!doctor) {
    throw new ApiError(404, "Doctor not found");
  }

  res.json({
    success: true,
    data: doctor,
  });
});

export const createDoctor = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    phone,
    password,
    specializations,
    qualifications,
    experienceYears,
    consultationFee,
    languages,
    availability,
    isVerified,
  } = req.body;

  const session = await mongoose.startSession();
  let createdDoctorId;

  try {
    await session.withTransaction(async () => {
      const existingUser = await User.findOne({ email }).session(session);

      if (existingUser) {
        throw new ApiError(409, "An account with this email already exists");
      }

      const [user] = await User.create(
        [
          {
            name,
            email,
            phone: phone || null,
            password,
            role: "doctor",
          },
        ],
        { session }
      );

      const [doctor] = await Doctor.create(
        [
          {
            user: user._id,
            specializations,
            qualifications: qualifications || [],
            experienceYears: experienceYears || 0,
            consultationFee,
            languages: languages || [],
            availability: availability || [],
            isVerified: isVerified ?? false,
          },
        ],
        { session }
      );

      createdDoctorId = doctor._id;
    });
  } catch (error) {
    if (error?.code === 11000) {
      throw new ApiError(409, "Doctor email or profile already exists");
    }

    throw error;
  } finally {
    await session.endSession();
  }

  const doctor = await populateDoctorUser(
    Doctor.findById(createdDoctorId)
  );

  res.status(201).json({
    success: true,
    data: doctor,
  });
});

export const updateDoctor = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  let updatedDoctorId;

  try {
    await session.withTransaction(async () => {
      const doctor = await Doctor.findById(req.params.id).session(session);

      if (!doctor) {
        throw new ApiError(404, "Doctor not found");
      }

      const user = await User.findById(doctor.user)
        .select("+password")
        .session(session);

      if (!user) {
        throw new ApiError(404, "Doctor user account not found");
      }

      if (req.body.email && req.body.email !== user.email) {
        const emailExists = await User.findOne({
          email: req.body.email,
          _id: { $ne: user._id },
        }).session(session);

        if (emailExists) {
          throw new ApiError(409, "An account with this email already exists");
        }
      }

      if (req.body.name !== undefined) user.name = req.body.name;
      if (req.body.email !== undefined) user.email = req.body.email;
      if (req.body.phone !== undefined) user.phone = req.body.phone || null;
      if (req.body.password !== undefined) user.password = req.body.password;
      if (req.body.isActive !== undefined) user.isActive = req.body.isActive;

      const doctorFields = [
        "specializations",
        "qualifications",
        "experienceYears",
        "consultationFee",
        "languages",
        "availability",
        "isVerified",
      ];

      doctorFields.forEach((field) => {
        if (req.body[field] !== undefined) {
          doctor[field] = req.body[field];
        }
      });

      await user.save({ session });
      await doctor.save({ session });
      updatedDoctorId = doctor._id;
    });
  } catch (error) {
    if (error?.code === 11000) {
      throw new ApiError(409, "Doctor email or profile already exists");
    }

    throw error;
  } finally {
    await session.endSession();
  }

  const doctor = await populateDoctorUser(
    Doctor.findById(updatedDoctorId)
  );

  res.json({
    success: true,
    data: doctor,
  });
});

export const deactivateDoctor = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const doctor = await Doctor.findById(req.params.id).session(session);

      if (!doctor) {
        throw new ApiError(404, "Doctor not found");
      }

      const user = await User.findById(doctor.user).session(session);

      doctor.isVerified = false;

      if (user) {
        user.isActive = false;
        await user.save({ session });
      }

      await doctor.save({ session });
    });
  } finally {
    await session.endSession();
  }

  res.json({
    success: true,
    message: "Doctor account deactivated successfully",
  });
});