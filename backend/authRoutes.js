import express from "express";
import { registerUser,loginUser,tripD,search } from "./authConterollers.js";

const router=express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/tripd",tripD);
router.get("/search",search);

export default router;
