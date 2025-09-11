import { LeadModel } from "../models/Lead";
import { Request, Response } from "express";


export const updateLead = async (req : Request, res: Response) =>{
    try{
        const id  =  req.params.id;
        const data = req.body;
    
        const updated  = await LeadModel.findByIdAndUpdate(id, data, {new : true, runValidators : true})
    
        if(!updated){
            return res.status(404).json({ message: "Lead not Found" });
        }
    
        return res.status(200).json({ message: "Lead Updated", data: updated });
    }
    catch(error){
        return res.status(500).json({message : "Internal Server Error", error});
    }
}