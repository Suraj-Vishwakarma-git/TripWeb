import express from "express";
import { registerUser,loginUser,tripD,search, booking } from "./authConterollers.js";
import { protect } from "./authMiddleware.js";
const router=express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/tripd",tripD);
router.get("/search",search);
router.post("/booking",protect,booking)
export default router;
