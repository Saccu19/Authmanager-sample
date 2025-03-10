import mysql, { RowDataPacket } from "mysql2/promise";
import { accessConfiguration } from "./config";

export default async function query(
  sqlStatement: string,
  params?: Array<string>
) {
  try {
    console.log(accessConfiguration);
    const connection = await mysql.createConnection(accessConfiguration);
    console.log("Connessione eseguita con successo");
    const [results, rows] = await connection.execute<RowDataPacket[]>(
      sqlStatement,
      params
    );
    console.log("Query eseguita con successo");
    connection.end();
    return results;
  } catch (err) {
    console.error(err);
    throw new Error("Errore nell'esecuzione della query ---------");
  }
}
