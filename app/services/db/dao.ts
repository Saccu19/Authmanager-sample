/*
    Questo file contiente le funzioni che eseguono le query
*/

import { FieldPacket, QueryError, QueryResult, RowDataPacket } from "mysql2";
import { User } from "../../models/User";
import { userTable } from "./tables";
import query from "./query";
import comparePassword from "../../utilities/bcrypt-compare";

export async function InsertUser(
  params: User
): Promise<QueryResult | QueryError | FieldPacket[]> {
  return await query(
    `INSERT INTO ${userTable} (nome,email,password) VALUES(?,?,?)`,
    [params.nome, params.email, params.password]
  );
}
// this funztion is used for log in
export async function checkUser(
  params: Partial<User>
): Promise<QueryError | RowDataPacket[]> {
  return await query(`SELECT * FROM ${userTable} WHERE nome= ? AND email= ?`, [
    params.nome as string,
    params.email as string,
  ]);
}

export async function DeleteUser(param: User["id"]) {
  return await query(`DELETE FROM ${userTable} WHERE id= ?`, [param]);
}

export async function UpdateUser(params: Partial<User>) {
  return await query(
    `UPDATE ${userTable} SET nome= ? , email= ? , password= ? where id= ?`,
    [
      params.nome as string,
      params.email as string,
      params.password as string,
      params.id as string,
    ]
  );
}

export async function changeVersioning(param: User["id"], state: User["version"]) {
  return await query(`UPDATE ${userTable} SET version= ? WHERE id= ?`, [
    state,
    param,
  ]);
}

export async function checkVersioning(param: User["id"]) {
  return await query(`SELECT version FROM ${userTable} WHERE id= ?`, [param]);
}
