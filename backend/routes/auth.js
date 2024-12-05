import express from "express";
import User from "../controllers/user.js";

const router = express.Router();

router.post("/register", User.create);
router.get("/login", User.authenticate);

export default router;