import express, { Express, Request, RequestHandler, Response } from "express";
import { User } from "../../models/User";
import { InsertUser } from "../../services/db/dao";
import hash from "../../utilities/bcrypt-hash";
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registrazione di un nuovo utente
 *     description: Crea un nuovo utente nel sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: L'email dell'utente
 *               password:
 *                 type: string
 *                 description: La password dell'utente
 *               nome:
 *                 type: string
 *                 description: Il nome dell'utente
 *               cognome:
 *                 type: string
 *                 description: Il cognome dell'utente
 *             required:
 *               - email
 *               - password
 *               - nome
 *               - cognome
 *     responses:
 *       201:
 *         description: Registrazione completata con successo
 *       400:
 *         description: Dati mancanti o formattazione errata della password
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Non hai inserito i dati corretti"
 *       500:
 *         description: Errore interno del server
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Internal server error"
 */

export default async function Register(
  req: Request,
  res: Response
): Promise<any> {
  try {
    const values: Omit<User, "ruolo"> = req.body;
    if (Object.keys(values).length < 3)
      return res.status(400).send("Non hai inserito i dati corretti");
    const { hashedPassword, error } = await hash(values.password);
    if (error) return res.status(400).send(error);
    values.password = hashedPassword as string;
    const query = await InsertUser(values as unknown as User);
    res.status(201).send("Registrazione completata");
  } catch (err) {
    console.error("Registration error: ", err);
    res.status(500).send("Internal server error");
  }
}
