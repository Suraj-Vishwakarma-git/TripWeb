import express from "express";
import { registerUser,loginUser,tripD,search, booking, tripdd, bookinghis } from "./authConterollers.js";
import { protect } from "./authMiddleware.js";
const router=express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/tripd",tripD);
router.get("/tripdd/:id",tripdd)
router.get("/search",search);
router.post("/booking",protect,booking);
router.post("/bookinghistory",protect,bookinghis);
export default router;
