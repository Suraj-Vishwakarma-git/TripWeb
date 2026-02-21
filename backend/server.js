import dotenv from "dotenv";
import server from "./app.js";
import { connectDB } from "./db.js";

dotenv.config();
connectDB();
const PORT=process.env.PORT || 5000;
server.listen(PORT,()=>{
    console.log("Server Stated");
})
