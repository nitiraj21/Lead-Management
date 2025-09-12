import { Router } from "express";
import { createLead } from "../leadControllers/createLead";
import { getLeads } from "../leadControllers/getLeads";
import { getLeadByID } from "../leadControllers/getLeadByID";
import { updateLead } from "../leadControllers/updateLeads";
import { deleteLead } from "../leadControllers/deleteLead";
import { middleware } from "../middleware/middleware";

const router = Router();

router.post("/leads", middleware, createLead);
router.get("/leads", middleware,getLeads)
router.get("/leads/:id", middleware,getLeadByID)
router.put("/leads/:id", middleware,updateLead)
router.delete("/leads/:id", middleware, deleteLead)

export default router;