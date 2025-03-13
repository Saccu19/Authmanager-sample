import { User } from "../models/User";
import createSecret from "./secretGenerator";
import jwt from "jsonwebtoken";


export default function jwtCreateSecret(userCredentials: Partial<User>): string {
    try {
        const secret = createSecret();
        return jwt.sign(
                { email: userCredentials.email, id: userCredentials.id, ip: userCredentials.ip, ruolo: userCredentials.ruolo ? userCredentials.ruolo : "user" },
                process.env.SECRET as unknown as string,
                // {expiresIn: 60}
              );
    } catch {
        throw new Error("Errore nella creazione del jwt");
    }
}