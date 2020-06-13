import { Application, oakCors } from "./deps.ts";

import timbraturaRouter from "./router/timbraturaRouter.ts";

const env = Deno.env.toObject();
const PORT = env.PORT || 4000;
const HOST = env.HOST || "0.0.0.0";



const app = new Application();
app.use(oakCors());
app.use(timbraturaRouter.routes());
app.use(timbraturaRouter.allowedMethods());

console.log(`Listening on port ${PORT}...`);

await app.listen(`${HOST}:${PORT}`);
