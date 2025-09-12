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

        let filter : any  = {user_id : id};

        if(req.query.email){
            filter.email = req.query.email;
        }

        if(req.query.email_contain){
            filter.email  = {$regex : req.query.email_contain, $options : 'i'}
        }

        if(req.query.company_contain){
            filter.email  = {$regex : req.query.company_contain, $options : 'i'}
        }

        if(req.query.city_contain){
            filter.email  = {$regex : req.query.city_contain, $options : 'i'}
        }

        if(req.query.email_contain){
            filter.email  = {$regex : req.query.email_contain, $options : 'i'}
        }


        if (req.query.status) {
            filter.status = req.query.status;
        }

        if (req.query.status_in) {
            filter.status = { $in: (req.query.status_in as string).split(",") };
        }

        if (req.query.source_in) {
            filter.source = { $in: (req.query.source_in as string).split(",") };
        }

        if (req.query.score) {
            filter.score = Number(req.query.score);
          }
          if (req.query.score_gt) {
            filter.score = { ...filter.score, $gt: Number(req.query.score_gt) };
          }
          if (req.query.score_lt) {
            filter.score = { ...filter.score, $lt: Number(req.query.score_lt) };
          }
          if (req.query.score_between) {
            const [min, max] = (req.query.score_between as string).split(",").map(Number);
            filter.score = { $gte: min, $lte: max };
          }


          if (req.query.created_on) {
            filter.createdAt = new Date(req.query.created_on as string);
          }
          if (req.query.created_before) {
            filter.createdAt = { ...filter.createdAt, $lte: new Date(req.query.created_before as string) };
          }
          if (req.query.created_after) {
            filter.createdAt = { ...filter.createdAt, $gte: new Date(req.query.created_after as string) };
          }
          if (req.query.created_between) {
            const [start, end] = (req.query.created_between as string).split(",");
            filter.createdAt = { $gte: new Date(start), $lte: new Date(end) };
          }


          if (req.query.is_qualified) {
            filter.is_qualified = req.query.is_qualified === "true";
          }


        const total = await LeadModel.countDocuments(filter)

        const leads = await LeadModel.find({user_id : id}).skip(skip).limit(limit);

        return res.status(200).json({data : leads, page, limit, total, totalPages : Math.ceil(total/limit)});

    }
    catch(error){
        return res.status(500).json({message : "Internal Server error", error})
    }
}