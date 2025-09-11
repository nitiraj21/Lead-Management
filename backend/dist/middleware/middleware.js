"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT = process.env.JWT_secret || "secret";
const middleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "unauthorized" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT);
        //@ts-ignore
        req.userId = decoded.id;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
exports.middleware = middleware;
