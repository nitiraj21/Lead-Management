"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const leadRoutes_1 = __importDefault(require("./routes/leadRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
dotenv_1.default.config();
mongoose_1.default.connect(process.env.DB || "").then(() => { console.log("DB connected", process.env.DB); }).catch((error) => { console.log(error, "cant connect", process.env.DB); });
app.use("/auth", userRoutes_1.default);
app.use("/crud", leadRoutes_1.default);
app.get("/", (req, res) => {
    res.send("Server is Running");
});
app.listen(3001);
