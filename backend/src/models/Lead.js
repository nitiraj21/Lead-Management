"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadModel = void 0;
var mongoose_1 = require("mongoose");
var leadSchema = new mongoose_1.Schema({
    user_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    company: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    source: { type: String, enum: ["website", "facebook_ads", "google_ads", "referral", "events", "other"], required: true },
    status: { type: String, enum: ["new", "contacted", "qualified", "lost", "won"], required: true },
    score: { type: Number, min: 0, max: 100, required: true },
    lead_value: { type: Number, required: true },
    last_activity_at: { type: Date, default: null },
    is_qualified: { type: Boolean, default: false },
}, { timestamps: true });
exports.LeadModel = (0, mongoose_1.model)("Lead", leadSchema);
