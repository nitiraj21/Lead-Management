import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


const JWT = "secret"

export const middleware=  (req : Request, res : Response, next : NextFunction) =>{
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message : "unauthorized" })
    }
    try{
        const decoded = jwt.verify(token, JWT) as {id : string};
         
        //@ts-ignore
        req.userId = decoded.id;

        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid token" });
      }
}
