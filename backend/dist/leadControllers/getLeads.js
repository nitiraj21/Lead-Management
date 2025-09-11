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
        const total = yield Lead_1.LeadModel.countDocuments({ user_id: id });
        const leads = yield Lead_1.LeadModel.find({ user_id: id }).skip(skip).limit(limit);
        return res.status(200).json({ data: leads, page, limit, total, totalPages: Math.ceil(total / limit) });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server error", error });
    }
});
exports.getLeads = getLeads;
