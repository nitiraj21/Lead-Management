import { Request, Response } from "express";
import { middleware } from "../middleware/middleware";
import { LeadModel } from "../models/Lead";


export const createLead = async (req : Request, res : Response) =>{
    try{
        //@ts-ignore
        console.log("UserId from token:", req.userId);
        const leadData = {...req.body,
            //@ts-ignore
            user_id  : req.userId

        }

        const lead = new LeadModel(leadData)
        await lead.save();
        res.status(201).json({message : "Lead Created"});
    }
    catch (error) {
        console.error("Error creating lead:", error);
        res.status(500).json({ message: "Server error", error });
      }
}