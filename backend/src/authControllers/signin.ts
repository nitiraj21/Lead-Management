import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/User";


const JWT = process.env.JWT_secret || "secret"
export const signin = async(req : Request, res : Response) =>{
    try{
        const {email , password} = req.body;

        const user =  await UserModel.findOne({email});

        if(!user){
            return res.status(400).json({message : "Invalid Credentials"});
        }

        const match = await bcrypt.compare(password, user.password);

        if(!match){
            return res.status(400).json({message : "Invalid Credentials"});
        }

        const token = jwt.sign({id : user._id}, JWT)

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
          });

        return res.status(200).json({ message: "Login successful" });
    }
    catch(err){
        res.status(500).json({message : "Server error", err})
    }
}