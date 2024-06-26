import { Request, Response } from "express";
import AppError from "../Libs/helpers/appErro";
import UserService from "../Services/UserService";
import { AppRequest } from "../Middlewares/auth";

class UserController {
	static async login(req: Request, res: Response): Promise<Response> {
		const { email, password } = req.body;

		console.log("<<<<<");

		if (!email || !password) {
			throw new AppError(400, "Email and password are required", 400);
		}

		try {
			const access_token = await UserService.Login(email, password);

			if (!access_token) {
				throw new AppError(401, "Login failed", 401);
			}

			return res.status(200).json({ access_token });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: "Internal server error" });
		}
	}

	static async getMe(req: AppRequest, res: Response): Promise<Response> {
		const loginInfo = req.loginInfo;


		if (!loginInfo) {
			throw new AppError(401, "Unauthorized", 401);
		}

		const { userId } = loginInfo;

		try {
			const profile = await UserService.GetMe(userId);
			if (!profile) {
				throw new AppError(404, "User not found", 404);
			}
			return res.status(200).json({ profile });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: "Internal server error" });
		}
	}

	static async getAllUsers(req: Request, res: Response): Promise<Response> {
		const users = await UserService.GetAllUsers();
		if (!users) {
			throw new AppError(204, "There are no users", 404);
		}
		return res.status(200).json({ users });
	}
}

export default UserController;
