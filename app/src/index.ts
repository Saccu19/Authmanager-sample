import express, { Express } from "express";
import { auth } from "./config/router-auth";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import { content } from "./config/router-contents";
import path from "path";
import swaggerJSDoc from "swagger-jsdoc";
import { options } from "./config/swagger";


dotenv.config();
const __DIRNAME = path.resolve(__dirname, "..", "views");
export const app: Express = express();
const port = process.env.PORT || 3000;
const swaggerSpec = swaggerJSDoc(options)

// app.use(express.static("views"));  express.static è usato per renderizzare file in modo statico ma non permette di utilizzare res.render che invece permette di renderizzare file dinamici
// app.set('view engine', 'ejs'); per utilizzare res.render c'è bisogno di utilizzare un motore
app.use(express.json());
app.use("/auth", auth);
app.use("/api", content);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// console.log(__DIRNAME);
// console.log(apisPath);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
