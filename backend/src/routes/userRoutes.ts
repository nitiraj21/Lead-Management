import { Router } from "express";
import { register } from "../authControllers/register";
import { signin } from "../authControllers/signin";
import { logout } from "../authControllers/logout";

const router = Router();

router.post("/register", register);
router.post("/signin", signin);
router.post("/logout", logout);

export default router;