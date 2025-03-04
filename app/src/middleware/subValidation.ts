import { NextFunction, Request, Response } from "express";
import jwt, { Jwt, Secret } from "jsonwebtoken";
import { User } from "../../models/User";
import { checkVersioning } from "../../services/db/dao";

/* 
  Questo middleware è al secondo livello e segue validation, lo scopo è controllare l'autenticità del token e verificare
  che l'utente associato al token non abbia effettuato già un logout
*/
const secret = process.env.SECRET as unknown as Secret;

export default async function subValidation(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    res.locals.decodeToken = jwt.verify(token as string, secret) as Partial<User>;
    const data = await checkVersioning(res.locals.decodeToken.id as User["id"])
    if(data[0].version  == "logout") return res.status(401).send("Non hai effettuato il login");
    next();
  } catch (err) {
    res.status(401).send("Il tuo token non è valido");
  }
}
