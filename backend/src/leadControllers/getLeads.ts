import { Request, Response } from "express";
import { LeadModel } from "../models/Lead";


export const getLeads  = async (req : Request, res : Response) =>{
    try{
        //@ts-ignore
        const id = req.userId
        console.log(id);

        const page  = parseInt(req.query.page as string) || 1;
        const limit  = parseInt(req.query.limit as string) || 20;
        const skip = (page - 1) * limit;

        const total = await LeadModel.countDocuments({user_id : id})

        const leads = await LeadModel.find({user_id : id}).skip(skip).limit(limit);

        return res.status(200).json({data : leads, page, limit, total, totalPages : Math.ceil(total/limit)});

    }
    catch(error){
        return res.status(500).json({message : "Internal Server error", error})
    }
}