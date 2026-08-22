"use strict";

import { AppDataSource } from "../config/configDb";
import Pet from "../entity/pet.entity";

const petRepository = AppDataSource.getRepository(Pet);

