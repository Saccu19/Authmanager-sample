import { Request, Response } from "express";
import hash from "../../utilities/bcrypt-hash";
import { User } from "../../models/User";
import { UpdateUser } from "../../services/db/dao";

/**
 * @swagger
 * /api/update-profile:
 *   put:
 *     summary: Aggiorna il profilo dell'utente
 *     description: Permette a un utente autenticato non necessariamente con permessi di admin di aggiornare il proprio profilo, incluso l'aggiornamento della password. L'utente deve fornire un token JWT valido per eseguire l'operazione.
 *     security:
 *       - bearerAuth: []  # Richiede un token JWT valido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: L'indirizzo email dell'utente, che verrà aggiornato nel profilo.
 *               password:
 *                 type: string
 *                 description: La nuova password dell'utente.
 *               nome:
 *                 type: string
 *                 description: Il nome dell'utente che verrà aggiornato nel profilo.
 *             required:
 *               - email
 *               - password
 *               - nome
 *     responses:
 *       200:
 *         description: Profilo aggiornato con successo
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Profilo aggiornato"
 *       400:
 *         description: Errore nell'aggiornamento del profilo. Assicurati che tutti i campi siano validi e completi.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Errore nell'inserimento dei dati"
 *       401:
 *         description: Token mancante o non valido, l'accesso è negato.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Token mancante o non valido"
 *       500:
 *         description: Errore interno del server durante l'aggiornamento del profilo.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Errore nell'aggiornamento del profilo"
 */

export default async function UpdateProfile(req:Request, res:Response): Promise<any> {
    try {
        const params: Partial<User> = req.body;
        if(Object.keys(params).length < 3) return res.status(400).send("Errore nell'inserimento dei dati");
        const {hashedPassword, error} = await hash(params.password as string)
        if(error) return res.status(400).send(error)
        params.password = hashedPassword;
        params.id = res.locals.decodeToken.id as User["id"]
        await UpdateUser(params);
        res.status(200).send("Profilo aggiornato");
    } catch(err) {
        res.status(500).send("Errore nell'aggiornamento del profilo");
    }
}