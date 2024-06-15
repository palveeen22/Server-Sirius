import express from "express";
import AuthRouter from "./AuthRoute";
import UserRouter from "./UserRoute";
import { authMiddleware } from "../Middlewares/auth";
const router = express.Router();


router.use('/auth', AuthRouter);
// authentication
// app.use();


router.use('/user',authMiddleware, UserRouter);



export default router;
