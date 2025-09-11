import mongoose, {model, Schema} from "mongoose";

const leadSchema = new Schema({
    user_id : {type :Schema.Types.ObjectId, ref : 'User', required : true},
    first_name : {type : String, required :true},
    last_name : {type : String, required :true},
    email : {type : String, required: true, unique:true },
    phone : {type : String, required :true},
    company : {type : String, required :true},
    city : {type : String, required :true},
    state : {type : String, required :true},
    source : {type : String, enum: ["website", "facebook_ads", "google_ads", "referral", "events", "other"], required : true},
    status :{type : String, enum: ["new", "contacted", "qualified", "lost", "won"], required : true},
    score : {type : Number,min : 0, max : 100,required :true},
    lead_value : {type : Number, required :true},
    last_activity_at : {type :Date, default : null},
    is_qualified : {type :Boolean, default :false},


}, {timestamps : true})

export const LeadModel = model("Lead", leadSchema)