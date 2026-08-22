import { Router } from "express";
import {
  cancelAppointment,
  createAppointment,
  getMyAppointments,
  updateAppointmentStatus
} from "../controllers/appointment.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { validateRequest } from "../middleware/validate.middleware.js";
import {
  cancelAppointmentValidators,
  createAppointmentValidators,
  updateStatusValidators
} from "../validators/appointment.validators.js";

const router = Router();

router.use(authenticate);
router.get("/me", getMyAppointments);
router.post("/", authorize("patient"), createAppointmentValidators, validateRequest, createAppointment);
router.patch(
  "/:id/cancel",
  authorize("patient", "admin"),
  cancelAppointmentValidators,
  validateRequest,
  cancelAppointment
);
router.patch(
  "/:id/status",
  authorize("doctor", "admin"),
  updateStatusValidators,
  validateRequest,
  updateAppointmentStatus
);

export default router;
