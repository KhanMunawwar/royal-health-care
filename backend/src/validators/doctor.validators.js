import { body, param } from "express-validator";

const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

const requiredOrOptional = (field, isUpdate) =>
  isUpdate ? body(field).optional() : body(field);

const doctorProfileValidators = (isUpdate = false) => [
  requiredOrOptional("name", isUpdate)
    .trim()
    .isLength({ min: 2, max: 80 })
    .withMessage("Name must contain 2 to 80 characters"),

  requiredOrOptional("email", isUpdate)
    .isEmail()
    .normalizeEmail()
    .withMessage("A valid email is required"),

  body("phone")
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^\+?[0-9]{10,15}$/)
    .withMessage("Phone must contain 10 to 15 digits"),

  requiredOrOptional("password", isUpdate)
    .isLength({ min: 8, max: 72 })
    .withMessage("Password must contain 8 to 72 characters")
    .matches(/[A-Za-z]/)
    .withMessage("Password must contain a letter")
    .matches(/\d/)
    .withMessage("Password must contain a number"),

  requiredOrOptional("specializations", isUpdate)
    .isArray({ min: 1, max: 20 })
    .withMessage("At least one specialization is required"),

  body("specializations.*")
    .isString()
    .trim()
    .isLength({ min: 2, max: 80 })
    .withMessage("Each specialization must contain 2 to 80 characters"),

  body("qualifications")
    .optional()
    .isArray({ max: 20 })
    .withMessage("Qualifications must be an array"),

  body("qualifications.*")
    .isString()
    .trim()
    .isLength({ min: 2, max: 120 })
    .withMessage("Each qualification must contain 2 to 120 characters"),

  body("experienceYears")
    .optional()
    .isInt({ min: 0, max: 80 })
    .withMessage("Experience must be between 0 and 80 years")
    .toInt(),

  requiredOrOptional("consultationFee", isUpdate)
    .isFloat({ min: 0, max: 100000 })
    .withMessage("Consultation fee must be between 0 and 100000")
    .toFloat(),

  body("languages")
    .optional()
    .isArray({ max: 20 })
    .withMessage("Languages must be an array"),

  body("languages.*")
    .isString()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Each language must contain 2 to 50 characters"),

  body("availability")
    .optional()
    .isArray({ max: 14 })
    .withMessage("Availability must be an array"),

  body("availability.*.day")
    .optional()
    .isIn(DAYS)
    .withMessage("Availability contains an invalid day"),

  body("availability.*.startTime")
    .optional()
    .matches(TIME_PATTERN)
    .withMessage("Start time must use HH:MM 24-hour format"),

  body("availability.*.endTime")
    .optional()
    .matches(TIME_PATTERN)
    .withMessage("End time must use HH:MM 24-hour format"),

  body("availability.*")
    .optional()
    .custom((slot) => {
      if (slot.startTime >= slot.endTime) {
        throw new Error("Availability end time must be after start time");
      }

      return true;
    }),

  body("isVerified")
    .optional()
    .isBoolean()
    .withMessage("isVerified must be true or false")
    .toBoolean(),
];

export const createDoctorValidators = doctorProfileValidators(false);

export const updateDoctorValidators = [
  ...doctorProfileValidators(true),
  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be true or false")
    .toBoolean(),
];

export const doctorIdValidator = [
  param("id").isMongoId().withMessage("A valid doctor ID is required"),
];