import express from "express";
import Entity from "../controllers/entity.js";

const router = express.Router();

router.post("/", Entity.createEntity);

export default router;
