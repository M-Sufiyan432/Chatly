import { Router } from "express";
import { login, logout,  signup } from "../controllers/auth.controller.js";


const authRouter = Router();

authRouter.post("/signup",signup)
authRouter.post("/login",login)
authRouter.get("/logOut",logout)

export default authRouter;