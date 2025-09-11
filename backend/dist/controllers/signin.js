"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const JWT = process.env.JWT_secret || "secret";
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const match = yield bcrypt_1.default.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT);
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: true,
        });
        return res.status(200).json({ message: "Login successful" });
    }
    catch (err) {
        res.status(500).json({ message: "Server error", err });
    }
});
exports.signin = signin;
