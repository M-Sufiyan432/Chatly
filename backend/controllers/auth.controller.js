import getToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"

export const signup = async(req,res)=>{
   try {
    const {username,email,password} = req.body;
    console.log("Received body:", req.body);

    const checkUserbyUserName = await User.findOne({username})
    if(checkUserbyUserName){
        return res.status(400).json({message:"userName already exists"})
    }
    const checkUserbyEmail = await User.findOne({email})
    if(checkUserbyEmail){
        return res.status(400).json({message:"email already exists"})
    }

    if(password.length < 6){
          return res.status(400).json({message:"Password Must atleast 6 character"})
    }
    const hashedPassword = await bcrypt.hash(password,10);

    const user = await User.create({
        username,email,password:hashedPassword
    })

    const token = await getToken(user._id)

   res.cookie("token", token, {
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  sameSite: "Lax", // or "None" if using HTTPS and cross-origin
  secure: false    // should be true in production over HTTPS
});


    return res.status(201).json(user)

   } catch (error) {
    return res.status(500).json({message:`signup error ${error}`})
   }
}
export const login = async(req,res)=>{
   try {
    const {email,password} = req.body;
   
    const user = await User.findOne({email})

   
    if(!user){
        return res.status(400).json({message:"User doesnt exists exists"})
    }

  const isMatch = await bcrypt.compare(password,user.password)

  if(!isMatch){
        return res.status(400).json({message:"Incorrect Password"})
  }

    const token = await getToken(user._id)

   res.cookie("token", token, {
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  sameSite: "Lax", // or "None" if using HTTPS and cross-origin
  secure: false    // should be true in production over HTTPS
});


    return res.status(200).json(user)

   } catch (error) {
    return res.status(500).json({message:`login error ${error}`})
   }
}

export const logout =async(req,res)=>{
  try {
    res.clearCookie("token")
    return res.status(200).json({message:"log out successfully"})
  } catch (error) {
    return res.status(500).json({message:`logout error ${error}`})

  }
}