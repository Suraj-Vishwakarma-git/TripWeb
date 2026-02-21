import jwt from "jsonwebtoken";
import User from "./User.js";
export const protect=async (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token=req.headers.authorization.split(" ")[1];
        try{
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            req.user=await User.findById(decoded.id).select("-password");
            next();
        }catch(e){
            return res.status(401).json({message:"Not Authorized"});     
           }
    }
    if(!token) {
        return res.status(401).json({message:"No token"});
}
};

export const adminOnly=(req,res,next)=>{
    if(req.user && req.user.role==="admin"){
        next();
    }else{
        res.status(403).json({message:"Admin acess required"});
    }
}

