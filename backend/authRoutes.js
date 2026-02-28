import express from "express";
import { registerUser,loginUser,tripD,search, booking, tripdd, bookinghis, changeDate, deleteTickets } from "./authConterollers.js";
import { protect } from "./authMiddleware.js";
const router=express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/tripd",tripD);
router.get("/tripdd/:id",tripdd)
router.get("/search",search);
router.post("/booking",protect,booking);
router.post("/bookinghistory",protect,bookinghis);
router.put("/updatetickets",protect,changeDate);
router.delete("/deleteticket",protect,deleteTickets);
export default router;
