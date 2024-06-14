import { PrismaClient } from "@prisma/client";
import AppError from "../Libs/helpers/appErro";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

class UserService {
	//login
	static async Login(email: string, password: string) {
		try {
			// Cari user berdasarkan email
			const user = await prisma.user.findUnique({
				where: { email },
				include: { UserDetail: true },
			});

			if (!user) {
				throw new AppError(404, "There are no users", 404);
			}

			const isValidPassword = await bcrypt.compare(password, user.password);

			if (!isValidPassword) {
				throw new AppError(404, "Email or Password invalid", 404);
			}

			const access_token = jwt.sign(
				{ senderId: user.id, email: user.email },
				process.env.JWT_SECRET!,
				{ expiresIn: "1h" }
			);

			return access_token;
		} catch (err) {
			console.log(err);
		}
	}

	// create user new
	static async CreateUser() {}

	// read all users
	static async GetAllUsers() {
		return await prisma.user.findMany({
			include: {
				UserDetail: true,
			},
		});
	}

	// read all user detail
	static async GetUserDetail(email: string) {
		return await prisma.user.findUnique({
			where: {
				email: email,
			},
		});
	}

	// delete user
	static async DeteleUser() {}

	// update user
	static async UpdateUser() {}
}

export default UserService;
