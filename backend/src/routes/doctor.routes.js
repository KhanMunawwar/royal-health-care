import { Router } from "express";
import { param } from "express-validator";
import { getDoctor, listDoctors } from "../controllers/doctor.controller.js";
import { validateRequest } from "../middleware/validate.middleware.js";

const router = Router();

router.get("/", listDoctors);
router.get("/:id", param("id").isMongoId(), validateRequest, getDoctor);

export default router;
