import express from "express";
import userRoute from "./UserRoute";
const router = express.Router();


router.use('/api/v.1/users', userRoute);



export default router;
