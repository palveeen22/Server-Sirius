import express from "express";
import tryCatch from "../../Libs/helpers/tryAndCatch";
import UserController from "../../Controllers/UserController";


const UserRouter = express.Router();


UserRouter.get("/v.1/listUsers", tryCatch(UserController.getAllFarmers))


export default UserRouter;
