import { Request, Response } from "express";
import { middleware } from "../middleware/middleware";
import { LeadModel } from "../models/Lead";


export const createLead = async (req : Request, res : Response) =>{
    try{
        const leadData = {...req.body,
            //@ts-ignore
            user_id  : req.userId

        }

        const lead = new LeadModel(leadData)
        await lead.save();
        res.status(201).json({message : "Lead Created"});
    }
    catch(error){
        res.status(500).json({message: "Server error", error})
    }
}