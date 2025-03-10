import mysql, { ConnectionOptions } from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const accessConfiguration: ConnectionOptions = {
  host: "database",  // quando si lancia il container l'host diventa il container che contiene il database non più localhost se vuoi lanciare in locale il programma cambia l'host con localhost
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD,
};

