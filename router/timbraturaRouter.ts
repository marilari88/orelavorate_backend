import { Router } from "../deps.ts";

import {
  getTimbrature,
  createTimbratura,
  getTimbratura,
  updateTimbratura,
} from "../controllers/timbraturaController.ts";

const router = new Router();
router
  .get("/timbratura", getTimbrature)
  .get("/timbratura/:id", getTimbratura)
  .post("/timbratura", createTimbratura)
  .put("/timbratura/:id", updateTimbratura);

export default router;
