import mysql, {
  Connection,
  OkPacket,
  OkPacketParams,
  RowDataPacket,
} from "mysql2/promise";
import { accessConfiguration } from "./config";
import { User } from "../../models/User";

export default async function query(
  sqlStatement: string,
  params?: Array<string>
) {
  try {
    const connection = await mysql.createConnection(accessConfiguration);
    console.log("Connessione eseguita con successo");
    // let data: string[] = [];
    // if (params) {
    //   data = [`${params.nome}`, `${params.email}`, `${params.password}`];
    //   if (Object.keys(params).length == 1)
    //     data.filter((value) => value == params.email);
    // }
    const [results, rows] = await connection.execute<RowDataPacket[]>(
      sqlStatement,
      params
    );
    console.log("Query eseguita con successo");
    connection.end();
    return results;
  } catch (err) {
    throw new Error("Errore nell'esecuzione della query ---------");
  }
}
