import { Appointment } from "../models/Appointment.js";
import { Doctor } from "../models/Doctor.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createAppointment = asyncHandler(async (req, res) => {
  const { doctorId, appointmentDate, timeSlot, consultationType, reason } = req.body;

  if (appointmentDate <= new Date()) {
    throw new ApiError(422, "Appointment date must be in the future");
  }

  if (timeSlot.start >= timeSlot.end) {
    throw new ApiError(422, "Appointment end time must be after start time");
  }

  const doctor = await Doctor.findOne({ _id: doctorId, isVerified: true });
  if (!doctor) throw new ApiError(404, "Verified doctor not found");

  const conflict = await Appointment.exists({
    doctor: doctorId,
    appointmentDate,
    "timeSlot.start": timeSlot.start,
    status: { $ne: "cancelled" }
  });

  if (conflict) throw new ApiError(409, "This appointment slot is already booked");

  const appointment = await Appointment.create({
    patient: req.user._id,
    doctor: doctorId,
    appointmentDate,
    timeSlot,
    consultationType,
    reason
  });

  await appointment.populate([
    { path: "patient", select: "name email phone" },
    { path: "doctor", populate: { path: "user", select: "name email phone" } }
  ]);

  res.status(201).json({ success: true, data: appointment });
});

export const getMyAppointments = asyncHandler(async (req, res) => {
  let filter;

  if (req.user.role === "patient") {
    filter = { patient: req.user._id };
  } else if (req.user.role === "doctor") {
    const doctor = await Doctor.findOne({ user: req.user._id });
    if (!doctor) throw new ApiError(404, "Doctor profile not found");
    filter = { doctor: doctor._id };
  } else {
    filter = {};
  }

  const appointments = await Appointment.find(filter)
    .populate("patient", "name email phone")
    .populate({ path: "doctor", populate: { path: "user", select: "name email phone" } })
    .sort({ appointmentDate: 1 });

  res.json({ success: true, data: appointments });
});

export const cancelAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) throw new ApiError(404, "Appointment not found");

  const isOwner = appointment.patient.equals(req.user._id);
  if (!isOwner && req.user.role !== "admin") {
    throw new ApiError(403, "You cannot cancel this appointment");
  }

  if (["completed", "cancelled"].includes(appointment.status)) {
    throw new ApiError(409, `A ${appointment.status} appointment cannot be cancelled`);
  }

  appointment.status = "cancelled";
  appointment.cancellationReason = req.body.reason;
  await appointment.save();

  res.json({ success: true, data: appointment });
});

export const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) throw new ApiError(404, "Appointment not found");

  if (req.user.role === "doctor") {
    const doctor = await Doctor.findOne({ user: req.user._id });
    if (!doctor || !appointment.doctor.equals(doctor._id)) {
      throw new ApiError(403, "You cannot update this appointment");
    }
  }

  if (appointment.status === "completed" || appointment.status === "cancelled") {
    throw new ApiError(409, `A ${appointment.status} appointment cannot be updated`);
  }

  appointment.status = req.body.status;
  await appointment.save();
  res.json({ success: true, data: appointment });
});
