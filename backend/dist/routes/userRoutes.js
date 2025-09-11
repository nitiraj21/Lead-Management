"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const register_1 = require("../authControllers/register");
const signin_1 = require("../authControllers/signin");
const router = (0, express_1.Router)();
router.post("/register", register_1.register);
router.post("/signin", signin_1.signin);
exports.default = router;
