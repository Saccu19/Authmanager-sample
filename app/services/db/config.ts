import mysql, { ConnectionOptions } from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const accessConfiguration: ConnectionOptions = {
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD,
};
