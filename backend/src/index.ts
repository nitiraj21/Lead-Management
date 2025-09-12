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
const allowedOrigins = [
    "https://lead-management-blush-nu.vercel.app", 
    "http://localhost:5173"              
  ];
app.use(cors({
    origin: function(origin, callback){
      if(!origin) return callback(null, true); 
      if(allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }));
//@ts-ignore
mongoose.connect(process.env.DB).then(()=>{console.log("DB connected", process.env.DB)}).catch((error) =>{console.log(error, "cant connect",  process.env.DB)})

app.use("/auth", userRoutes);
app.use("/crud", leadRoutes);

app.get("/", (req, res)=>{
    res.send("Server is Running")
})

app.listen(3001);