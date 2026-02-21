import express from "express";
import cors from "cors";
import authRoutes from "./authRoutes.js";

const server=express();

server.use(cors());
server.use(express.json());

server.get("/",(req,res)=>{
    res.send("TripNest API running");
});

server.use("/api/auth",authRoutes);

export default server;

