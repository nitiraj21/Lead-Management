import { Router } from "express";
import { register } from "../authControllers/register";
import { signin } from "../authControllers/signin";

const router = Router();

router.post("/register", register);
router.post("/signin", signin);

export default router;