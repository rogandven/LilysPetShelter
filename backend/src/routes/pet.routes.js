"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { createPet, deletePet, getManyPets, getPet, updatePet } from "../controllers/pet.controller.js";

const router = Router();

router
  .use(authenticateJwt);

router
  .get("/getmany", getManyPets)
  .get("/get/:id", getPet)
  .post("/create", createPet)
  .patch("/update", updatePet)
  .delete("/delete", deletePet);

export default router;