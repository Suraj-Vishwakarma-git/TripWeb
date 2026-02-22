import mongoose from "mongoose";

const Booking=mongoose.model("Booking",new mongoose.Schema({
    userBid:mongoose.Schema.Types.ObjectId,
    tripId:mongoose.Schema.Types.ObjectId,
    payment:{enum:["PAID","PENDING"],default:"PENDING"},
    title:String,
    image:String,
    price:Number
}));

export default Booking;