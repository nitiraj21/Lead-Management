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
exports.getLeadByID = void 0;
const Lead_1 = require("../models/Lead");
const getLeadByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const id = req.params.id;
        const lead = yield Lead_1.LeadModel.findById(id);
        if (!lead) {
            return res.status(404).json("Lead not Found");
        }
        return res.status(200).json({ data: lead });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
});
exports.getLeadByID = getLeadByID;
