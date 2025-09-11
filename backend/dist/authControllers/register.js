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
exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../models/User");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existing = yield User_1.UserModel.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 6);
        const user = new User_1.UserModel({ email: email, password: hashedPassword });
        yield user.save();
        return res.status(201).json({ message: "user signed up" });
    }
    catch (err) {
        return res.status(500).json({ message: "Error", err });
    }
});
exports.register = register;
