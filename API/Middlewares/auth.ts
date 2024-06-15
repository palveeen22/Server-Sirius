// src/middlewares/authMiddleware.ts
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface LoginInfo {
	userId: number;
	email: string;
	role: number;
}

export interface AppRequest extends Request {
	loginInfo?: LoginInfo;
}

declare global {
	namespace Express {
		interface Request {
			loginInfo?: {
				userId: number;
				email: string;
				role: number;
			};
		}
	}
}

interface CustomJwtPayload extends JwtPayload {
	userId: number;
	email: string;
}

export async function authMiddleware(
	req: AppRequest,
	res: Response,
	next: NextFunction
) {
	const token = req.headers.authorization?.replace("Bearer ", "");
	if (!token) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	try {
		// Verifikasi token
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET!
		) as CustomJwtPayload;

		console.log("Token decoded:", decoded);

		const user = await prisma.user.findUnique({
			where: { email: decoded.email },
			include: { UserDetail: true },
    });
    
    console.log(user, "<<<<XXX");

		if (!user) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		req.loginInfo = {
			userId: user.id,
			email: user.email,
			role: user.role,
    };
    
    console.log(req.loginInfo, "<<MEMEK");

		next();
	} catch (error) {
		console.error("Authentication error:", error);
		return res.status(401).json({ message: "Unauthorized" });
	}
}
