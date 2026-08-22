"use strict";

import { handleErrorClient, handleErrorServer, handleSuccess } from "../handlers/responseHandlers.js";
import { createPetService, deletePetService, getManyPetsService, getPetService, updatePetService 
} from "../services/pet.service.js";

export async function getPet(req, res) {
  try {
    const serviceResult = await getPetService(req?.params?.id || 0);
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
    const serviceResult = await getManyPetsService(null, null);
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
    const petToUpdate = await getPetService(id);
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
    const petToDelete = await deletePetService(id);
    if (!(petToDelete.isSuccess())) {
      return handleErrorClient(res, petToDelete.statusCode, petToDelete.message, petToDelete.data);
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