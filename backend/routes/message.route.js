import express from "express"
import isAuth from "../middleware/isAuth.js"
import { updoad } from "../middleware/multer.js";
import { getMessage, sendMessage } from "../controllers/message.controller.js";

const messageRouter= express.Router()


messageRouter.post("/send/:receiver",isAuth,updoad.single("image"),sendMessage)
messageRouter.get("/get/:receiver",isAuth,getMessage)

export default messageRouter;