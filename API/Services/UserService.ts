import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import AppError from "../Libs/helpers/appErro";

const prisma = new PrismaClient();

class UserService {
	//login
	static async Login(email: string, password: string) {
		try {
			// Cari user berdasarkan email
			return await prisma.user.findUnique({
				where: { email },
				include: { UserDetail: true },
			});
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
