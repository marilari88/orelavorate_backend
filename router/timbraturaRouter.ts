import { Router } from "../deps.ts";

import {
  getTimbrature,
  createTimbratura,
  getTimbratura,
  updateTimbratura,
  deleteTimbratura,
} from "../controllers/timbraturaController.ts";

const router = new Router();
router
  .get("/timbrature", getTimbrature)
  .get("/timbrature/:id", getTimbratura)
  .get("/timbrature/:last", getTimbratura)
  .post("/timbrature", createTimbratura)
  .put("/timbrature/:id", updateTimbratura)
  .delete("/timbrature/:id", deleteTimbratura);

export default router;
