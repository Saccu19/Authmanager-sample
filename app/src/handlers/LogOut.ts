import { Request, Response } from "express";
import { User } from "../../models/User";
import { changeVersioning } from "../../services/db/dao";

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Effettua il logout dell'utente
 *     description: Segna l'utente come "logout" aggiornando il suo stato di autenticazione nel database. La funzione aggiorna la versione di login dell'utente per indicare che l'utente ha effettuato il logout.
 *     responses:
 *       200:
 *         description: Logout riuscito, utente disconnesso correttamente
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "logout"
 *       500:
 *         description: Errore interno del server
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Errore del server"
 */

// Questa rotta ritorna una pafina html all'utente atutenticato
export default async function Logout(req: Request, res: Response): Promise<any> {
    try {
        const paylod: Partial<User> = res.locals.decodeToken
        await changeVersioning(paylod.id as string, 'logout');
        res.status(200).send("logout");
    } catch(err) {
        res.status(500).send("Errore del server");
    }
}