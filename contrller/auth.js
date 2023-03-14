import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";
import User from "./models/User.js"


export const register=async(req,resp)=>{
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        }=req.body;

        const salt=await bcrypt.genSalt();
        const passwordHash=await bcrypt.hash(password,salt);

        const newUser= new User({
            firstName,
            lastName,
            email,
            password:passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile:Math.floor(Math.random() * 1000),
            impression:Math.floor(Math.random() * 1000),
        });

       const saveUser= await newUser.save();

        resp.status(201).json(saveUser);
    } catch (error) {
        resp.status(500).json({error:error.message});
    }
};

//login



export const login=async(req,resp)=>{
    try {
        const {email,password}=req.body;

        const user=await User.findOne({email:email});

        if(!user){
          return  resp.status(400).json({message:"User Not found"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return  resp.status(400).json({message:"Inavlid credentails"});
        }
        const token=await jwt.sign({_id:user._id},process.env.JWT_SECRET);
        delete user.password;

        resp.status(201).json({token,user});
    } catch (error) {
        resp.status(500).json({error:error.message});
    }
}