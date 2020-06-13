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
  .get("/timbratura", getTimbrature)
  .get("/timbratura/:id", getTimbratura)
  .post("/timbratura", createTimbratura)
  .put("/timbratura/:id", updateTimbratura)
  .delete("/timbratura/:id", deleteTimbratura);

export default router;
