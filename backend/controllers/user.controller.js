import uploadOnCloudenary from "../config/cloudenary.js";
import User from "../models/user.model.js";

export const getCurrentUser = async(req,res)=>{
  try {
    let userId = req.userId;
    let user = await User.findById(userId).select("-password")
    if(!user){
        return res.status(400).json({message:"user not found"})
    }
    return res.status(200).json(user)

  } catch (error) {
    return res.status(500).json({message:`current user error ${error}`})
  }
}
export const editProfile = async(req,res)=>{
  try {
    
 
    let {name} =req.body;
    let image;
    if(req.file){
      image= await uploadOnCloudenary(req.file.path)
    }
    let user = await User.findByIdAndUpdate(req.userId,{
      name,
      image
    },{new:true})
    if(!user){
      return res.status(400).json({message:"user is not found"})
    }
    return res.status(200).json(user)
     } catch (error) {
      console.log(error);
       return res.status(500).json({message:`Profile error ${error}`})
  }
} 

export const getOtherUsers = async (req,res)=>{
  try {
    let users = await User.find({
      _id : {$ne:req.userId}
    }).select("-password")
    console.log("Requesting userId:", req.userId);
    return res.status(200).json(users)
  } catch (error) {
     return res.status(500).json({message:`Get Other Users error ${error}`})
  }
}
export const search = async(req,res)=>{
    try {
          let {query} = req.query
          if(!query){
            return res.status(400).json({message:"query is requerd"})
          }
          let user = await User.find({
            $or:[
              {name:{$regex:query ,$options:"i"}},
              {username:{$regex:query ,$options:"i"}},
            ]
          })
          return res.status(200).json(user)
   } catch (error) {
           return res.status(500).json({message:`Search Users error ${error}`})
  }
}