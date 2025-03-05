# Authmanager-sample
Questa è una semplice api costruita da me in ExpressJS che si concentra sulla gestione dell'autenticazione di utetni ad un servizio.
Il progetto  utilizza docker per lanciare un immagine node e un'immagine di mysql per il database su cui viene creata un unica tabella per gestire gli utenti.
Lo scopo del progetto è quello di avere un piccolo progetto portfolio in cui ho mostrato le mie conoscenze basi del docker, di nodeJS e della gestione di un database relazionale, allo stesso modo il mio intento è quello di avere un piccolo progetto che chiunque in pochi minuti possa scaricare e testare.

Il progetto è stato creato puramnte a scopo dimostrativo e non a scopo di produzione, non sono presenti le best practice per la produzione come ad esempio l'implementazione di helmet o semplicemnte la presenza degli stati di staging.

## Requisiti
- [Docker](https://www.docker.com/)
- [Bruno(consigliato)](https://www.usebruno.com/) o un client per fare richieste http come [Postman](https://www.postman.com/)
- [DBeaver(consigliato)](https://dbeaver.io/) o un qualunque client per visualizzare le tabelle del database

## Istallazione
### 1- Clona la repository e inseriscila in una cartella di destinazione locale a tua scelta.
Se stai utilizzando vscode ti basterà seguire le istruzioni cliccando su "Clone git repository", altrimenti dovrai utilizzare il comando "git clone" da terminale.
``` terminal
git clone https://prova.com
```
### 2- Apri il progetto.
Apri la repository locale su cui hai destinato Authmanager-sample con il tuo editor di testo o il tuo IDE preferito, una volta dentro spostasti nella cartella app.
Se utitlizzi vscode una volta clonata la repository l'editor ti dirà in automatico se vuoi aprire la cartella.
``` Terminal
cd app
```
La cartella app contiene tutti i file necessari per l'avvio del programma compresi i file di configurazione del docker.
- **`├──`** models/  Contiene i modelli per lavorare con typescript
- **`└──`** services/  Contiene i servizi utilizzati nel progetto come il "db"
- **`└──`** src/  Contiene l'entry point "index.ts", i middleware, gli handlers e le configgurazioni
- **`└──`** utilities/  Contiene delle funzioni di utilities.
- **`└──`** .env  Contiene le variabili di configuarazione per l'intero progetto.
- **`└──`** compose.yaml  Contiene le configurazioni dei docker container che servono per lanciare il servizio. 
- **`└──`** Dockerfile  Contiene l'immagine del progetto node quindi solo dell'api e non del database.
- **`└──`** nodemon.json  Contiene informazioni necessarie a "nodemon" per avviare l'esecuzione del programma con "ts-node".

### 3- Set up del file .env
All'interno della cartella app apri il file .env e assegna dei valori alle variabili.
``` markdown
PORT=8000
MAIN_URL=http://localhost:8000
ALGORITHMS= HS256
SECRET=<your secret>
MYSQL_DATABASE= <your db name>
MYSQL_USER=<your mysql user>
MYSQL_PASSWORD=<your mysql user password>
MYSQL_ROOT_PASSWORD=<your mysql root account password>
```

Il concetto è che quando verrà lanicato mysql di defualt si crea un utente "root" e con la variabile "MYSQL_ROOT_PASSWORD" gli assegnamo una password.
Nel momento in cui accediamo alla nostra istallazione mysql possiamo creare un utente specifico che abbia accesso ad uno specifico database che possiamo creare.
Nel nostro caso già alla prima istallazione diciamo subito a mysql che vogliamo un utente oltre al root che si chiama "MYSQL_USER" e che ha una password "MYSQL_PASSWORD" e il database a cui può accedere è "MYSQL_DATABASE".
Infatti nel file di configurazione della connessione con il database della nostra api utilizziamo per connetterci prorio questo utente non l'utente root.

``` markdown
export const accessConfiguration: ConnectionOptions = {
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD,
};
```


