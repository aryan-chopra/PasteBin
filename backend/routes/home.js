import express from "express";
import Entity from "../controllers/entity.js";

const router = express.Router();

router.get("/:entityId", Entity.getEntity);
router.put("/:entityId", Entity.editEntity);

export default router;
