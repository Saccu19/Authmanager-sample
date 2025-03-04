import { NextFunction, Request, Response } from "express";
import path from "path";

const __DIRNAME = path.resolve(__dirname, "..", "views");

// questo middleware rappresenta il primo livello di sicurezza cioè dove si controlla se il client è autenticato oppure no
export default function validation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token: string | undefined = req.headers.authorization;
  if (!token || token == "Bearer") {
    res.status(401).send("No Auth");
  } else {
    return next();
  }
}
