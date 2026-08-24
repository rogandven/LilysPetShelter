"use strict";

import { handleErrorClient, handleErrorServer, handleSuccess } from "../handlers/responseHandlers.js";
import { adoptPetService, createPetService, deletePetService, getManyPetsService, getPetService, updatePetService 
} from "../services/pet.service.js";
import { getPrintableId } from "../utils/service.utils.ts";
import { validationHelper } from "../utils/validation.utils.ts";
import { petIntegrityValidation, petRegisterValidation } from "../validations/pet.validation.js";

export async function getPet(req, res) {
  try {
    const serviceResult = await getPetService(req?.params?.id || 0, true);
    if (serviceResult.isSuccess()) {
      return handleSuccess(res, serviceResult.statusCode, serviceResult.message, serviceResult.data);
    }
    return handleErrorClient(res, serviceResult.statusCode, serviceResult.message, serviceResult.message);
  } catch (error) {
    return handleErrorServer(res, 500, "Error interno del servidor");
  }
}

export async function getManyPets(req, res) {
  //// TODO: Permitir pasar parametros a esta función
  try {
    const serviceResult = await getManyPetsService(null, null, true);
    if (serviceResult.isSuccess()) {
      return handleSuccess(res, serviceResult.statusCode, serviceResult.message, serviceResult.data);
    }
    return handleErrorClient(res, serviceResult.statusCode, serviceResult.message, serviceResult.message);
  } catch (error) {
    return handleErrorServer(res, 500, "Error interno del servidor");
  }
}

export async function createPet(req, res) {
  try {
    const validationResult = validationHelper(req?.body || {}, [petRegisterValidation, petIntegrityValidation]);


    const serviceResult = await createPetService(req.body);
    if (serviceResult.isSuccess()) {
      return handleSuccess(res, serviceResult.statusCode, serviceResult.message, serviceResult.data);
    }
    return handleErrorClient(res, serviceResult.statusCode, serviceResult.message, serviceResult.message);
  } catch (error) {
    return handleErrorServer(res, 500, "Error interno del servidor");
  }  
}

export async function updatePet(req, res) {
  try {
    const id = req?.params?.id || 0; //// TODO: add ID validation
    const petToUpdate = await getPetService(id, false);
    if (!(petToUpdate.isSuccess())) {
      return handleErrorClient(res, petToUpdate.statusCode, petToUpdate.message, petToUpdate.data);
    }
    const serviceResult = await updatePetService(req?.params?.id || 0, petToUpdate.data, req?.body || {});
    if (serviceResult.isSuccess()) {
      return handleSuccess(res, serviceResult.statusCode, serviceResult.message, serviceResult.data);
    }
    return handleErrorClient(res, serviceResult.statusCode, serviceResult.message, serviceResult.data);
  } catch (error) {
    return handleErrorServer(res, 500, "Error interno del servidor");
  }
}

export async function deletePet(req, res) {
  try {
    const id = req?.params?.id || 0; //// TODO: add ID validation
    const petToDelete = await getPetService(id, false);
    if (!(petToDelete.isSuccess())) {
      return handleErrorClient(res, petToDelete.statusCode, petToDelete.message, petToDelete.data);
    }
    const serviceResult = await deletePetService(req?.params?.id || 0, petToDelete.data);
    if (serviceResult.isSuccess()) {
      return handleSuccess(res, serviceResult.statusCode, serviceResult.message, serviceResult.data);
    }
    return handleErrorClient(res, serviceResult.statusCode, serviceResult.message, serviceResult.data);
  } catch (error) {
    console.error(error);
    return handleErrorServer(res, 500, "Error interno del servidor");
  }
}

export async function adoptPet(req, res) {
  try {
    const id = req?.params?.id || 0; //// TODO: add ID validation
    const petToAdopt = await getPetService(id, false);
    if (!(petToAdopt.isSuccess())) {
      return handleErrorClient(res, petToAdopt.statusCode, petToAdopt.message, petToAdopt.data);
    }
    if ((petToAdopt?.data?.owner_id || 0) === (req?.user?.id || 0)) {
      return handleErrorClient(res, 409, `${petToAdopt?.data?.name 
        || getPrintableId(id)} ya le pertenece`, petToAdopt.data);
    }

    const serviceResult = await adoptPetService(req?.user?.id || 0, petToAdopt.data);
    if (serviceResult.isSuccess()) {
      return handleSuccess(res, serviceResult.statusCode, serviceResult.message, serviceResult.data);
    }
    return handleErrorClient(res, serviceResult.statusCode, serviceResult.message, serviceResult.data);
  } catch (error) {
    console.error(error);
    return handleErrorServer(res, 500, "Error interno del servidor");
  }  
}