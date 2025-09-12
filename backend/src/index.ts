import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes"
import leadRoutes from "./routes/leadRoutes"
import dotenv from "dotenv";




const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();
app.use(cors({ origin: "*", credentials: true }));
//@ts-ignore
mongoose.connect(process.env.DB).then(()=>{console.log("DB connected", process.env.DB)}).catch((error) =>{console.log(error, "cant connect",  process.env.DB)})

app.use("/auth", userRoutes);
app.use("/crud", leadRoutes);

app.get("/", (req, res)=>{
    res.send("Server is Running")
})

app.listen(3001);