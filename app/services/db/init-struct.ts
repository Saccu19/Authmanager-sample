import { userTable } from "./tables";
import query from "./query";

/*
 Questo file contiene le query di creazione della tabella
*/

export default async function init_struct() {
  try {
    const results = await query(
      `CREATE TABLE IF NOT EXISTS ${userTable} 
              (
                  id int primary key auto_increment,
                  nome varchar(30) not null,
                  email varchar(80) not null unique,
                  password varchar(100) not null,
                  version ENUM('login', 'logout') not null default 'logout'
              )`
    );
    return results;
  } catch (err) {
    console.log("Errore nella creazione della tabella " + err);
  }
}

init_struct();
