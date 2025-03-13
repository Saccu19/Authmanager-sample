import path from "path";
import { Options } from "swagger-jsdoc";
/*
  file di configurazione di Swagger
*/
export const apisPath = path.resolve(
  __dirname,
  "..",
  "handlers",
  "*.ts"
);
export const options: Options = {
  //   failOnErrors: true, Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AuthManager",
      version: "1.0.0",
      description: "Simple authentication api wrote in ExpressJS",
    },
  },
  servers: [
    {
      url: "http://localhost:8000",
    },
  ],
  apis: [apisPath],
};
