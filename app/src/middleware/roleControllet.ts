import { NextFunction, Request, Response } from "express";
import { User } from "../../models/User";

/*
  Questo middleware ha la funzione di controllare se l'utente che ha inviato la richiesta ha i permessi di user
  altrimenti non può accede a determinate risorse
*/
export default function roleController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const data: Partial<User> = res.locals.decodeToken;
  if (data.ruolo != "admin") {
    res
      .status(400)
      .send("Non sei amministratore, non puoi accedere a questa risorsa");
  } else {
    next();
  }
}
