import { Request, Response } from "express";


/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Ottieni il dashboard dell'utente
 *     description: Questa rotta è protetta e richiede un token JWT per accedere alle risorse.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard recuperata con successo
 *       401:
 *         description: Autenticazione fallita o token non valido
 */

export default function Dashboard(req: Request, res: Response): void {
    res.status(200).send("Dashboard");
}
