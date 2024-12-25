import express from "express";
import User from "../controllers/user.js";

const router = express.Router();

router.get("/", User.getAllEntities);

export default router;
