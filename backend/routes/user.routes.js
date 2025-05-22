import express from "express"
import { editProfile, getCurrentUser, getOtherUsers, search } from "../controllers/user.controller.js"
import isAuth from "../middleware/isAuth.js"
import { updoad } from "../middleware/multer.js";

const userRouter = express.Router()

userRouter.get("/current",isAuth,getCurrentUser);
userRouter.get("/others",isAuth,getOtherUsers);
userRouter.put("/profile",isAuth,updoad.single("image"),editProfile)
userRouter.get("/search",isAuth,search);


export default userRouter;