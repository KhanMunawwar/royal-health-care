import { Router } from "express";
import { getMe, login, register } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { validateRequest } from "../middleware/validate.middleware.js";
import { loginValidators, registerValidators } from "../validators/auth.validators.js";

const router = Router();

router.post("/register", registerValidators, validateRequest, register);
router.post("/login", loginValidators, validateRequest, login);
router.get("/me", authenticate, getMe);

export default router;
