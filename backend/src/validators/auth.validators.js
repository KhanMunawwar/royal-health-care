import { body } from "express-validator";

export const registerValidators = [
  body("name").trim().isLength({ min: 2, max: 80 }).withMessage("Name must contain 2 to 80 characters"),
  body("email").isEmail().normalizeEmail().withMessage("A valid email is required"),
  body("phone").optional({ checkFalsy: true }).trim().isLength({ min: 10, max: 15 }).withMessage("Phone must contain 10 to 15 characters"),
  body("password")
    .isLength({ min: 8, max: 72 })
    .withMessage("Password must contain 8 to 72 characters")
    .matches(/[A-Za-z]/)
    .withMessage("Password must contain a letter")
    .matches(/\d/)
    .withMessage("Password must contain a number")
];

export const loginValidators = [
  body("email").isEmail().normalizeEmail().withMessage("A valid email is required"),
  body("password").isString().notEmpty().withMessage("Password is required")
];
