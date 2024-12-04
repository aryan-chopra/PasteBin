import express from "express";
import User from "../controllers/user.js";

const router = express.Router();

router.post("/register", User.create);

export default router;