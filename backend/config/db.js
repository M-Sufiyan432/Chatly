import mongoose from "mongoose";

 const connectionDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("db conneted");
        
    } catch (error) {
         console.log("db error:", error)
    }
 }
 export default connectionDb