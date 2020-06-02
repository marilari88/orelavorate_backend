/* import { Application } from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts"; */
import { Application } from "https://deno.land/x/abc/mod.ts";

import "https://deno.land/x/dotenv/load.ts";
import {
  inserisciTimbratura,
  getTimbrature
} from "./controllers/ore.ts";

import { ErrorMiddleware } from "./utils/middlewares.ts";

const app = new Application();

app.use(ErrorMiddleware);

app
  .post("/timbratura", inserisciTimbratura)
  .get("/timbratura",getTimbrature)
  .start({ port: 5000 });

console.log(`server listening on http://localhost:5000`);
