import express from "express";
import tryCatch from "../../Libs/helpers/tryAndCatch";
import UserController from "../../Controllers/UserController";


const userRoute = express.Router();

userRoute.post("/auth", tryCatch(UserController.login))

userRoute.get("/", tryCatch(UserController.getAllFarmers))






export default userRoute;
