"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeads = void 0;
const Lead_1 = require("../models/Lead");
const getLeads = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const id = req.userId;
        console.log(id);
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;
        let filter = { user_id: id };
        if (req.query.email) {
            filter.email = req.query.email;
        }
        if (req.query.email_contain) {
            filter.email = { $regex: req.query.email_contain, $options: 'i' };
        }
        if (req.query.company_contain) {
            filter.company = { $regex: req.query.company_contain, $options: 'i' };
        }
        if (req.query.city_contain) {
            filter.city = { $regex: req.query.city_contain, $options: 'i' };
        }
        if (req.query.email_contain) {
            filter.email = { $regex: req.query.email_contain, $options: 'i' };
        }
        if (req.query.status) {
            filter.status = req.query.status;
        }
        if (req.query.status_in) {
            filter.status = { $in: req.query.status_in.split(",") };
        }
        if (req.query.source_in) {
            filter.source = { $in: req.query.source_in.split(",") };
        }
        if (req.query.score) {
            filter.score = Number(req.query.score);
        }
        if (req.query.score_gt) {
            filter.score = Object.assign(Object.assign({}, filter.score), { $gt: Number(req.query.score_gt) });
        }
        if (req.query.score_lt) {
            filter.score = Object.assign(Object.assign({}, filter.score), { $lt: Number(req.query.score_lt) });
        }
        if (req.query.score_between) {
            const [min, max] = req.query.score_between.split(",").map(Number);
            filter.score = { $gte: min, $lte: max };
        }
        if (req.query.created_on) {
            filter.createdAt = new Date(req.query.created_on);
        }
        if (req.query.created_before) {
            filter.createdAt = Object.assign(Object.assign({}, filter.createdAt), { $lte: new Date(req.query.created_before) });
        }
        if (req.query.created_after) {
            filter.createdAt = Object.assign(Object.assign({}, filter.createdAt), { $gte: new Date(req.query.created_after) });
        }
        if (req.query.created_between) {
            const [start, end] = req.query.created_between.split(",");
            filter.createdAt = { $gte: new Date(start), $lte: new Date(end) };
        }
        if (req.query.is_qualified) {
            filter.is_qualified = req.query.is_qualified === "true";
        }
        const total = yield Lead_1.LeadModel.countDocuments(filter);
        const leads = yield Lead_1.LeadModel.find(filter).skip(skip).limit(limit);
        return res.status(200).json({ data: leads, page, limit, total, totalPages: Math.ceil(total / limit) });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server error", error });
    }
});
exports.getLeads = getLeads;
