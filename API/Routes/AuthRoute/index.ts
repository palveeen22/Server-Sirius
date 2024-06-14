import express from "express";
import tryCatch from "../../Libs/helpers/tryAndCatch";
import UserController from "../../Controllers/UserController";


const AuthRouter = express.Router();

AuthRouter.post("/v.1/login", tryCatch(UserController.login))

export default AuthRouter