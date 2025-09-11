import { LeadModel } from "../models/Lead";
import { Request, Response } from "express";

export const  deleteLead = async (req : Request, res : Response) =>{
    try{
        const id  = req.params.id;
        await LeadModel.deleteOne({_id : id});

        return res.status(200).json({message : "Lead deleted", id})
    }
    catch(error){
        return res.status(500).json({message : "internal server error", error})
    }
}