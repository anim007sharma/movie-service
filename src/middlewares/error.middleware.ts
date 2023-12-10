import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log("HERE",err)
  res.status(500).send({
    errors: [{ message: err.message }],
  });
};
