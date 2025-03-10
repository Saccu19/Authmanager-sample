import { Request, Response } from "express";
import { DeleteUser } from "../../services/db/dao";
import { User } from "../../models/User";


/**
 * @swagger
 * /api/metrics:
 *   get:
 *     summary: Ottieni le metriche di sistema
 *     description: Ritorna le metriche di sistema, disponibile solo per utenti amministratori autenticati. L'utente deve fornire un token JWT valido con i permessi necessari.
 *     security:
 *       - bearerAuth: []  # Richiede un token JWT valido
 *     responses:
 *       200:
 *         description: Le metriche di sistema sono state restituite con successo.
 *         content:
 *           text/plain:
 *             schema:
 *                type: string
 *                example: Metrics
 *  
 *       401:
 *         description: Token mancante o non valido oppure non hai privilegi di admin, l'accesso è negato.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Token mancante o non valido"
 *       500:
 *         description: Errore interno del server durante il recupero delle metriche.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Errore nella richiesta dei dati"
 * /api/delete-user:
 *   delete:
 *     summary: Elimina un utente
 *     description: Permette a un amministratore autenticato di eliminare un utente specificato tramite l'id. L'utente deve fornire un token JWT valido con i permessi necessari.
 *     security:
 *       - bearerAuth: []  # Richiede un token JWT valido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: L'id dell'utente da eliminare
 *             required:
 *               - id
 *     responses:
 *       200:
 *         description: L'utente è stato eliminato con successo.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Utente eliminato"
 *       400:
 *         description: Errore nell'eliminazione dell'utente, l'id fornito potrebbe essere errato o mancante.
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
 *         description: Errore interno del server durante l'eliminazione dell'utente.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Errore nell'eliminazione dell'utente"
 */

export default async function AdminAction(req: Request, res: Response): Promise<any> {
  if (req.method == "GET") {
    try {
      res.status(200).send("Metrics");
    } catch (err) {
      res.status(500).send("Errore nella richeista dei dati");
    }
  } else {
    try {
      const id: User["id"] = req.body.id;
      if(!id) return res.status(400).send("Errore nell'inserimento dei dati");
      await DeleteUser(id);
      res.status(200).send("Utente eliminato");
    } catch (err) {
      res.status(500).send("Errore nell'eliminazione dell'utente");
    }
  }
}
