import { LeadModel } from "../models/Lead";
import { Request, Response } from "express";


export const getLeadByID = async (req : Request, res : Response) =>{
        try{
            //@ts-ignore
            const id = req.params.id

            const lead = await LeadModel.findById(id)

            if(!lead){
                return res.status(404).json("Lead not Found")
            }

            return res.status(200).json({data : lead})
        }
        catch(error){
            return res.status(500).json({message : "Internal Server Error", error})
        }


}