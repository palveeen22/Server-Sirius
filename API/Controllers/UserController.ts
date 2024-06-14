import { Request, Response } from "express";
import AppError from "../Libs/helpers/appErro";
import UserService from "../Services/UserService";

class UserController {
	static async login(req: Request, res: Response): Promise<Response> {
		  const { email, password } = req.body;

		const user = await UserService.Login(email, password);
		
		if (!user) {
			throw new AppError(404, "There are no users", 404);
		}
		return res.status(200).json({ user });
	}

	static async getAllFarmers(req: Request, res: Response): Promise<Response> {
		const users = await UserService.GetAllUsers();
		if (!users) {
			throw new AppError(204, "There are no users", 404);
		}
		return res.status(200).json({ users });
	}
}

export default UserController;
