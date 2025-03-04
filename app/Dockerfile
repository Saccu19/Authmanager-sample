FROM node:lts
RUN mkdir -p /app
COPY . ./app
WORKDIR /app
RUN npm install
CMD ["npx", "ts-node", "services/db/init-struct.ts", "&&", "npx", "ts-node", "src/index.ts"]