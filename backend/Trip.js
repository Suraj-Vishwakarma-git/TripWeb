import mongoose from "mongoose";
const Trip=mongoose.model("Trip",new mongoose.Schema({
    id:Number, 
    title:String,
     image:String,
    ticketPrice:Number
}));
export default Trip;
