// src/middlewares/authMiddleware.ts
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
}

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as CustomJwtPayload;

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { UserDetail: true },
    });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.loginInfo = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
}
