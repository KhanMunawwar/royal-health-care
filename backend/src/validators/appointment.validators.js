import { body, param } from "express-validator";

const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;

export const createAppointmentValidators = [
  body("doctorId").isMongoId().withMessage("A valid doctorId is required"),
  body("appointmentDate").isISO8601().toDate().withMessage("A valid appointmentDate is required"),
  body("timeSlot.start").matches(timePattern).withMessage("Start time must use HH:mm format"),
  body("timeSlot.end").matches(timePattern).withMessage("End time must use HH:mm format"),
  body("consultationType")
    .optional()
    .isIn(["clinic", "video", "audio", "chat", "home"])
    .withMessage("Invalid consultation type"),
  body("reason").optional().trim().isLength({ max: 500 }).withMessage("Reason is too long")
];

export const appointmentIdValidator = [
  param("id").isMongoId().withMessage("A valid appointment id is required")
];

export const updateStatusValidators = [
  ...appointmentIdValidator,
  body("status").isIn(["confirmed", "completed", "cancelled"]).withMessage("Invalid appointment status")
];

export const cancelAppointmentValidators = [
  ...appointmentIdValidator,
  body("reason").optional().trim().isLength({ max: 300 }).withMessage("Cancellation reason is too long")
];
