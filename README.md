# Authmanager-sample
Semplice api costruita in ExpressJS che si concentra sulla gestione dell'autenticazione di utenti ad un servizio.
Il progetto  utilizza docker per lanciare l'intero ambiente con un immagine node e un'immagine di mysql.
Lo scopo del progetto è quello di avere un piccolo progetto portfolio in cui mostrare conoscenze di basi del docker, nodeJS e della costruzione di una REST api.

Il progetto è stato creato puramnte a scopo dimostrativo e non a scopo di produzione, non sono infatti presenti le best practice per la produzione.

## Requisiti
- [Docker](https://www.docker.com/)
- [Bruno(consigliato)](https://www.usebruno.com/) o un client per fare richieste http come [Postman](https://www.postman.com/)
- [DBeaver(consigliato)](https://dbeaver.io/) o un qualunque client per visualizzare le tabelle del database

## Istallazione
Di seguito sono riportate le fasi per scaricare la repository e lanciare l'ambiente docker per far girare l'api
### 1- Clonare la repository.
Se stai utilizzando vscode ti basterà seguire le istruzioni cliccando su "Clone git repository", altrimenti dovrai utilizzare il comando "git clone" da terminale.
``` terminal
git clone https://prova.com
```
### 2- Cartella di lavoro.
Apri la repository locale su cui hai destinato Authmanager-sample con il tuo editor di testo o il tuo IDE preferito, una volta dentro spostasti nella cartella app.
Se utitlizzi vscode una volta clonata la repository l'editor ti dirà in automatico se vuoi aprire la cartella.
``` Terminal
cd app
```
La cartella app contiene tutti i file necessari per l'avvio dell'ambiente docker e per l'esecuzione dell'api.
- **`├──`** models/  Contiene i modelli per lavorare con typescript
- **`└──`** services/  Contiene i servizi utilizzati nel progetto come il "db"
- **`└──`** src/  Contiene l'entry point "index.ts", i middleware, gli handlers e le configgurazioni
- **`└──`** utilities/  Contiene delle funzioni di utilities.
- **`└──`** .env  Contiene le variabili di configuarazione per l'intero progetto.
- **`└──`** compose.yaml  Contiene le configurazioni dei docker container che servono per lanciare il servizio. 
- **`└──`** Dockerfile  Contiene l'immagine dell'ambiente node quindi solo dell'api e non del database.
- **`└──`** nodemon.json  Contiene informazioni necessarie a ["nodemon"](https://www.npmjs.com/package/nodemon) per avviare l'esecuzione del programma con ["ts-node"](https://www.npmjs.com/package/ts-node).

### 3- Set up
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

Il concetto è che quando verrà lanciato mysql di defualt si crea un utente "root" e con la variabile "MYSQL_ROOT_PASSWORD" gli assegnamo una password.
Nel momento in cui accediamo alla nostra istallazione mysql possiamo creare un utente specifico che abbia permessi limitati(sarà proprio l'utente che eseguirà le query nel database).
Creare un utente con delle restrizioni è una best practice perchè non è consigliato utilizzare il root account in applicazioni esterne che manipolano il database.
Nel nostro caso già alla prima istallazione diciamo subito a mysql che vogliamo un utente oltre al root che si chiama "MYSQL_USER" e che ha una password "MYSQL_PASSWORD" e il database a cui può accedere è "MYSQL_DATABASE".
Infatti nel file di configurazione della connessione con il database utilizziamo per connetterci prorio questo utente non l'utente root e quindi questo utente potrà eseguire operazioni solo sul database che gli abbiamo assegnato.

``` markdown
export const accessConfiguration: ConnectionOptions = {
  host: "database", 
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD,
};
```
### 4- Avvio dell'ambiente
Una volta fatto il set up del progetto, è tutto pronto per l'avvio.
Assicurati di essere nella workdir corretta cioè app che è appunto la cartella in cui si trova il nostro compose.yaml.
Diamo un'occhiata al compose.yaml.
``` yaml
services:
  api:
    image: authmanagernode-sample
    build: .
    ports:
      - "8000:8000"
    depends_on:
      database:
        condition: service_healthy
    networks:
      - authmanagersample-network
    
    # these options allow to sync code changes without manually restart the container
    develop:
      watch:
        - action: sync
          path: .
          target: /src
  database:
    image: mysql:latest
    healthcheck:
      test: ["CMD", "mysqladmin" ,"ping", "-h", "localhost"]
      interval: 10s
      retries: 5
      start_period: 30s
      timeout: 10s

    # [reminder] active only when the container running properly otherwise you can come across a loop 
    # restart: always

    volumes:
      - Authmanagersample-db:/var/lib/mysql
      # - ./utilities/secrets/db_name.txt:/run/secrets/db_name:ro #:ro read-only
      # - ./utilities/secrets/db_user.txt:/run/secrets/db_user:ro
      # - ./utilities/secrets/db_password.txt:/run/secrets/db_password:ro
      # - ./utilities/secrets/db_root_password.txt:/run/secrets/db_root_password:ro
    # dichiaro i file che contengono le variabili di ambiente
    env_file: "./.env"
    networks:
      - authmanagersample-network
    
    environment:
      # Qui specifico a quale database può accedere l'utente MYSQL-USER infatti esso avrà accesso soltanto a quel database
      MYSQL_DATABASE: ${MYSQL_DATABASE}
      # Nome di un utente che può accedere al database
      MYSQL_USER: ${MYSQL_USER}
      # Password per un utente qualunque che può accedere al database
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
      # Password per l'accesso del root account che di default è root, per gestire utenti e altro lo potrò fare solo con il root account
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
    # secrets:
    #   - db_name
    #   - db_user
    #   - db_password
    #   - db_root_password
    ports:
      # <Port exposed> : <MySQL Port running inside container>
      - '3306:3306'
    expose:
      - 3306

# using Docker best practices to pass sensitive data securely
# secrets:
#   db_name:
#     file: ./utilities/secrets/db_name.txt
#   db_user: 
#     file: ./utilities/secrets/db_user.txt
#   db_password:
#     file: ./utilities/secrets/db_password.txt
#   db_root_password:
#     file: ./utilities/secrets/db_root_password.txt

# Names our volume
volumes:
  Authmanagersample-db:
networks:
  authmanagersample-network:
    name: authmanagersample-network
```
Il compose.yaml definisce i container e il loro comportamento
- app (il nostro container che contiene l'immagine di nodeJS e che eseguirà la nostra api)
- database (Il contaienr che conterrà il nostro database)
- volumes (I volumi conterranno tutti i dati del database in modo tale che se stoppiamo e riavviamo il container "database" non perderemo i dati dell'applicazione)
- network (Definisce un nnetwork comune per i due container)

Per avviare i container puoi utilizzare l'interfaccia utente di docker Desktop oppure usare il terminale.
Da terminale lancia il comando:
``` terminal
docker compose -p <your-container-name> up
```
Il risultato è che se tutto è andato a buon fine avrai un container <your-container-name> che contiene altri due container app e database.
Controlliamo che tutto sia in esecuzione come vogliamo.
``` terminal
docker container ls
```
Questo comando restituirà i contaienr in esecuzione che nel nostro caso se non hai altri servizi in esecuzione sono due.
Abbiamo allora due container avviati che parlano tra loro perchè sappiamo anche che la connessione al database è stata eseguita correttamente(lo puoi verificare dai logs di app).
All'avvio del container app parte per primo lo script che esegue la connessione al database e crea la nostra tabella Utenti con i relativi attributi.

### 5- Test degli endpoint
Possiamo ora andare a testare gli endopoint della nostra api, apri Bruno o il tuo client preferito.
Effettua questa chiaamta per recuperare la documentazione dell'api(consiglio di fare questo passaggio direttamente dal browser)
``` terminal
http://localhost:8000/api-docs
```
ATTENZIONE: La porta che inserisci dipende dalla variabile d'ambiente PORT che hai inserito nel progetto.
Una volta fatta la chiamata avrai una pagina con tutti i dettagli dei vari endpoint.
Per la documentazione api ho utilizzato Swagger che permette in oltre dalla sua interfaccia grafica di fare direttamente delle chiamate per testare gli end-point.

## Conclusioni
Bene ora hai avviato un progetto completamente dockerizzato che gestisce l'autenticazione degli utenti.
Ho scrito un articolo sul mio sito dove parlo nello specifico di come ho sviluppato il codice e le difficoltà nell'utilizzo di Docker.
Di seguito ti lascio i miei contatti:
- [Website](https://saccutelliwebsolutions.com)
- [Linkedin](https://www.linkedin.com/in/ivan-saccutelli-811638270/)
