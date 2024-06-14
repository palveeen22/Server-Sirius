import express from "express";
import AuthRouter from "./AuthRoute";
import UserRouter from "./UserRoute";
const router = express.Router();


router.use('/auth', AuthRouter);
router.use('/user', UserRouter);



export default router;
