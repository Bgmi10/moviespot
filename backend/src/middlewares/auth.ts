import express from "express";
import jwt from "jsonwebtoken";

export const auth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(400).json({ success: false, message: "Unauthroized" });
    return;
  }

  const isValidToken = jwt.verify(token, process.env.JWT_SECRET as string);

  if (!isValidToken) {
    res.status(400).json({ success: false, message: "Unauthroized" });
    return;
  }

  //@ts-ignore
  req.user = isValidToken;
  next();
}