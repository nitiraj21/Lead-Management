import { Router } from "express";
import { createLead } from "../leadControllers/createLead";
import { getLeads } from "../leadControllers/getLeads";
import { getLeadByID } from "../leadControllers/getLeadByID";
import { middleware } from "../middleware/middleware";

const router = Router();

router.post("/leads", middleware, createLead);
router.get("/leads", middleware,getLeads)
router.get("/lead/:id", middleware,getLeadByID)

export default router;