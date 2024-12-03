import express from "express";
import Entity from "../controllers/entityController.js";

const router = express.Router();

router.get("/:entityId", Entity.getEntity);

export default router;
