import { Router } from "express";
import { create, login, verifyToken } from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post('/create', validateSchema(registerSchema), create);
router.get('/verify', verifyToken);
router.post('/login', validateSchema(loginSchema), login);

export default router;