import { Router } from "express";

import {
  createDoctor,
  deactivateDoctor,
  getDoctor,
  listAllDoctors,
  listDoctors,
  updateDoctor,
} from "../controllers/doctor.controller.js";
import {
  authenticate,
  authorize,
} from "../middleware/auth.middleware.js";
import { validateRequest } from "../middleware/validate.middleware.js";
import {
  createDoctorValidators,
  doctorIdValidator,
  updateDoctorValidators,
} from "../validators/doctor.validators.js";

const router = Router();

router.get("/", listDoctors);

router.get(
  "/admin",
  authenticate,
  authorize("admin"),
  listAllDoctors
);

router.post(
  "/",
  authenticate,
  authorize("admin"),
  createDoctorValidators,
  validateRequest,
  createDoctor
);

router.patch(
  "/:id",
  authenticate,
  authorize("admin"),
  doctorIdValidator,
  updateDoctorValidators,
  validateRequest,
  updateDoctor
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  doctorIdValidator,
  validateRequest,
  deactivateDoctor
);

router.get(
  "/:id",
  doctorIdValidator,
  validateRequest,
  getDoctor
);

export default router;