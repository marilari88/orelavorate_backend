import { Application } from "https://deno.land/x/abc/mod.ts";

import "https://deno.land/x/dotenv/load.ts";
import { abcCors } from "https://deno.land/x/cors/mod.ts";
import {
  inserisciTimbratura,
  getTimbrature,
} from "./controllers/ore.ts";

import { ErrorMiddleware } from "./utils/middlewares.ts";

const app = new Application();

app.use(ErrorMiddleware);
/* app.use(abcCors({
  origin: /^.+localhost:(3000)$/,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
})); */

//TODO AGGIUNGERE RIGA PER FILTRARE RICHIESTE IN BASE ORIGIN
app.use(abcCors());
app
  .options("/timbratura", (c) => c, abcCors())
  .post("/timbratura", inserisciTimbratura)
  .get("/timbratura", getTimbrature)
  .start({ port: 8080 });
