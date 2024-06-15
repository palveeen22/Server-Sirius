import express from "express";
import tryCatch from "../../Libs/helpers/tryAndCatch";
import UserController from "../../Controllers/UserController";


const UserRouter = express.Router();


UserRouter.get("/v.1/listUsers", tryCatch(UserController.getAllUsers))
UserRouter.get("/v.1/profile", tryCatch(UserController.getMe))



export default UserRouter;
