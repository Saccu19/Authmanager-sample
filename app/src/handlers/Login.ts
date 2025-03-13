import { Request, Response } from "express";
import { User } from "../../models/User";
import { changeVersioning, checkUser } from "../../services/db/dao";
import jwtCreateSecret from "../../utilities/jwtCreateSecret";
import comparePassword from "../../utilities/bcrypt-compare";
import { RowDataPacket } from "mysql2";


export type Prova = {
  password: string;
};

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Effettua il login dell'utente e restituisce un token JWT.
 *     description: Confronta la password fornita con quella memorizzata nel database. Se la password è corretta, viene restituito un token JWT che può essere utilizzato per l'autenticazione nelle richieste successive e che contiene informazioni dell'utente come ip, ruolo(admin o user), email e id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Il nome che hai fornito durante la registrazione nel sistema
 *               email:
 *                 type: string
 *                 description: L'indirizzo email dell'utente, utilizzato per identificare l'utente nel sistema.
 *               password:
 *                 type: string
 *                 description: La password dell'utente, utilizzata per autenticarsi.
 *               ruolo:
 *                 type: string
 *                 description: Il ruolo con cui vuoi autenticarti "admin" o "user" se non fornito di default user
 *             required:
 *               - email
 *               - password
 *               - nome
 *     responses:
 *       200:
 *         description: Login riuscito, token JWT restituito
 *         headers:
 *           Authorization:
 *             description: Il token JWT per l'autenticazione nelle richieste successive.
 *             schema:
 *               type: string
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Autenticazione completata, ora puoi accedere alle risorse protette"
 *       400:
 *         description: Credenziali non valide.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Non sei registrato" 
 *       401:
 *         description: Password errata.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Password errata"
 *       500:
 *         description: Errore del server, ad esempio se la richiesta al database fallisce.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Errore nella fase di login"
 */

export default async function Login(
  req: Request,
  res: Response
): Promise<any>{
  const credentials: Partial<User> = req.body;
  if(Object.keys(credentials).length < 3) return res.status(400).send("Non hai inserito le credenziali")
  const userIp = req.ip;
  credentials.ip = userIp;
  try {
    // this function return an object array tha contains the password in db for the user
    const data = await checkUser(credentials) as RowDataPacket;
    if(Object.keys(data).length == 0) return res.status(400).send("Non sei registrato");
    const hashedPassword = data[0].password as string;
    const result: Boolean = await comparePassword(
      credentials.password as string,
      hashedPassword
    );
    if (!result) return res.status(400).send("Password errata");
    credentials.id = data[0].id as User["id"]
    await changeVersioning(credentials.id, 'login')
    const secret: string = jwtCreateSecret(credentials);
    res
      .set("Authorization", `${secret}`)
      .status(200)
      .send(
        "Autenticazione completata, ora puoi accedere alle risorse protette"
      );
  } catch (err) {
    console.error("Errore di login: ", err);
    res.status(500).send("Errore nella fase di login");
  }
}
