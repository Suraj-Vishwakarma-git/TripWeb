import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./User.js";
import Trip from "./Trip.js";
import Booking from "./Booking.js";
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1h"});
};

export const registerUser =async (req,res)=>{
   try{ const {name,email,password}=req.body;
    if(!name || !email || !password ){
        return res.status(400).json({message:"All fields are required"});
    }
    const existing =await User.findOne({email});
    if(existing){
        return res.status(400).json({message:"Account already exists"});
    }
    const hashed=await bcrypt.hash(password,10);
    const user=await User.create({
        name,email,password:hashed
    });
    res.status(201).json({message:"Account Created Successfully",Account:user});}
    catch(e){
        res.status(500).json({message:"Server Error"});
    }
};

export const loginUser=async (req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    
    if(!user){
       return  res.json({message:"Account Not Exist"});
    }

    const passawait =await bcrypt.compare(password,user.password);
    if(!passawait){
        res.json({message:"Invalid Password"});
    }
    if(user && (passawait)){
        res.json({
            message:"LogedIn Successfully",
            token:generateToken(user._id)
        });
    }else{
        res.status(401).json({message:"Invalid Credentials"});
    }
};

export const tripD=async (req,res)=>{
    const data=await Trip.find();
    res.json(data);
}

export const tripdd=async (req,res)=>{
    const data=await Trip.findById(req.params.id);
    res.json(data);
}


export const search=async (req,res)=>{
   try{ 
    const data=req.query.search || "";
    const trip=await Trip.find({
        title:{$regex:data,$options:"i"}
    });
    res.json(trip);}
  catch(e){
    res.status(500).json({message:"Server Error"})
  }
}

export const booking=async (req,res)=>{
   try{ const {id,country,date}=req.body;
    const tri=await Trip.findById(id);
    if(!tri) {
        return res.status(404).json({message:"Trip Not Found"});
    }
    const data=await Booking.create({
            userBid:req.userId,
            tripId:tri._id,
            title:tri.title,
            image:tri.image,
            price:tri.ticketPrice,
            country:country,
            date:date
    });
    res.json({message:"Ticket Booked Successfully"});
}
catch(e){
    res.status(500).json({message:"Server Error"});
  }
}

export const changeDate=async (req,res)=>{
    const {Tid,newDates}=req.body;
    const Updatedticket=await Booking.findOneAndUpdate({_id:Tid,userBid:req.userId},{date:newDates},{new:true});
    if(!Updatedticket) res.json({message:"Ticket Not Found"});
    res.json({message:"Dates Updated Successfully"});
}

export const deleteTickets=async (req,res)=>{
    const {Tid}=req.body;
    const DeleteTicket=await Booking.findOneAndDelete({_id:Tid,userBid:req.userId});
    if(!DeleteTicket) res.json({message:"Ticket Not Found"});
    res.json({message:"Ticket Deleted Successfully"});
}

export const bookinghis=async (req,res)=>{
    const bookh=await Booking.find({userBid:req.userId});
    if(!bookh){
        return res.json({message:"Book Tickets..."})
    };
    res.json({bookh});
}