import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/User";

export const register = async (req : Request, res  :Response) =>{
    try{
        const {email, password} = req.body;

        const existing  = await UserModel.findOne({email})

        if(existing){
            return res.status(400).json({message : "User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 6);
        const user = new UserModel({email : email, password : hashedPassword});
        await user.save();

        return res.status(201).json({message : "user signed up"});
    }
    catch(err){
        return res.status(500).json({message : "Error" , err});
    }
}