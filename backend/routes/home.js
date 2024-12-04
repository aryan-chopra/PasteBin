import express from "express";
import Entity from "../controllers/entity.js";

const router = express.Router();

router.get("/:entityId", Entity.getEntity);

export default router;
