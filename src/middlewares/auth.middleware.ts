import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders) {
    return res.status(401).json({
      error: {
        status: 401,
        code: null,
        message: "No JWT Token Found",
        errors: null,
      },
    });
  }
  try {
    const token = (req.headers?.authorization! as string).replace(
      "Bearer ",
      ""
    );
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (user && user.isAdmin) {
      next();
    } else {
      return res.status(401).json({
        error: {
          status: 401,
          code: null,
          message: "Only admin access allowed",
          errors: null,
        },
      });
    }
  } catch (e) {
    console.error(e)
    return res.status(401).json({
      error: {
        status: 401,
        code: null,
        message: "Invalid token",
        errors: null,
      },
    });
  }
};
