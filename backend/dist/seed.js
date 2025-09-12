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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const faker_1 = require("@faker-js/faker");
const Lead_1 = require("./models/Lead");
const USER_ID = new mongoose_1.default.Types.ObjectId("68c2576274926af268d73057");
const sources = ["website", "facebook_ads", "google_ads", "referral", "events", "other"];
const statuses = ["new", "contacted", "qualified", "lost", "won"];
function seedLeads() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect("mongodb+srv://nitirajsc2112:Bobby123@cluster0.uzofs.mongodb.net/erino_new_db?retryWrites=true&w=majority&appName=Cluster0");
        const leads = Array.from({ length: 120 }).map(() => ({
            user_id: USER_ID,
            first_name: faker_1.faker.name.firstName(),
            last_name: faker_1.faker.name.lastName(),
            email: faker_1.faker.internet.email(), // simpler
            phone: "+91" + faker_1.faker.datatype.number({ min: 1000000000, max: 9999999999 }),
            company: faker_1.faker.company.companyName(),
            city: faker_1.faker.address.city(),
            state: faker_1.faker.address.state(),
            source: faker_1.faker.helpers.arrayElement(sources),
            status: faker_1.faker.helpers.arrayElement(statuses),
            score: faker_1.faker.datatype.number({ min: 0, max: 100 }),
            lead_value: faker_1.faker.datatype.number({ min: 1000, max: 100000 }),
            last_activity_at: faker_1.faker.date.recent(30), // pass days directly
            is_qualified: faker_1.faker.datatype.boolean(),
        }));
        yield Lead_1.LeadModel.insertMany(leads);
        console.log("✅ Seeded leads successfully 🚀");
        yield mongoose_1.default.disconnect();
    });
}
seedLeads().catch((err) => console.error(err));
