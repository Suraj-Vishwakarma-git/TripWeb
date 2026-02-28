import mongoose from "mongoose";

const Booking=mongoose.model("Booking",new mongoose.Schema({
    userBid:mongoose.Schema.Types.ObjectId,
    tripId:mongoose.Schema.Types.ObjectId,
    title:String,
    image:String,
    price:Number,
    country:String,
    date:Date
}));

export default Booking;