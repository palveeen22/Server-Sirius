// src/middlewares/authorizationMiddleware.ts
import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function authorizeTeacher(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { role } = req.loginInfo || {};
  if (role !== 1) { // Assuming role 1 is teacher
    return res.status(403).json({ message: "Forbidden: Access is denied." });
  }
  next();
}

export function authorizeStudent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { role } = req.loginInfo || {};
  if (role !== 2) { // Assuming role 2 is student
    return res.status(403).json({ message: "Forbidden: Access is denied." });
  }
  next();
}
