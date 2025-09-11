import { Router } from "express";
import { createLead } from "../leadControllers/createLead";
import { getLeads } from "../leadControllers/getLeads";
import { getLeadByID } from "../leadControllers/getLeadByID";
import { updateLead } from "../leadControllers/updateLeads";
import { deleteLead } from "../leadControllers/deleteLead";
import { middleware } from "../middleware/middleware";

const router = Router();

router.post("/lead", middleware, createLead);
router.get("/leads", middleware,getLeads)
router.get("/lead/:id", middleware,getLeadByID)
router.put("/lead/:id", middleware,updateLead)
router.delete("/lead/:id", middleware, deleteLead)

export default router;