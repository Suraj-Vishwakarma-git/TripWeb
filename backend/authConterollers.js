import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./User.js";
import Trip from "./Trip.js";

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
        res.json(500).json({message:"Server Error"});
    }
};

export const loginUser=async (req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
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