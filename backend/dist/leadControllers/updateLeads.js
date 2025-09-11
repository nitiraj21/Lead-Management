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
exports.updateLead = void 0;
const Lead_1 = require("../models/Lead");
const updateLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = req.body;
        const updated = yield Lead_1.LeadModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        if (!updated) {
            return res.status(404).json({ message: "Lead not Found" });
        }
        return res.status(200).json({ message: "Lead Updated", data: updated });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
});
exports.updateLead = updateLead;
