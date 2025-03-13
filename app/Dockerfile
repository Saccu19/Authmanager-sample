FROM node:lts
RUN mkdir -p /app
COPY . ./app
WORKDIR /app
# questo comando è necessario perchè i node_modules da windows a linux sono diversi quindi non eliminare la cartella porterà erori durante l'avvio del container
# se elimininamo la cartella al momento del lancio del comando npm install verranno creati dei nde_modules apposta per l'ambiente linux
RUN rm -rf node_modules 
RUN npm install
# CMD [ "npx", "ts-node", "services/db/init-struct.ts", "&&","npx", "ts-node", "src/index.ts"]
CMD [ "npm", "run", "up"]