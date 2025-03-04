import { NextFunction, Request, Response } from "express";
import { User } from "../../models/User";

/*
  Questo middleware ha il compito di controllare l'ip all'interno del token e confrontarlo con l'ip della richeista, se i dati
  non coincidono l'utente dovrà riloggarsi, in una situazione reale andrebbe fatto sotto eventuali controlli un login silent
*/

export default function compareIp(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const data: Partial<User> = res.locals.decodeToken;
  const requestIP = req.ip;
  if (requestIP != data.ip) {
    res.status(401).send(
      "Attenzione qualcuno potrebbe aver rubato il tuo token in quanto il tuo Ip è cambiato se sei tu rieffettua il login"
    );
  } else {
    next();
  }
}
