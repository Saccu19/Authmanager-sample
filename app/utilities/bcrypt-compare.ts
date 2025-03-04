import bcrypt from "bcrypt";
import { User } from "../models/User";

export default function comparePassword(defaultString: User["password"], hashedString: string ) {
    return bcrypt.compare(defaultString,hashedString)
}