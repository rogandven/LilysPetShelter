"use strict";

import { DEFAULT_OWNER } from "../constants/pet.constants.js";
import { handleErrorClient, handleErrorServer, handleSuccess } from "../handlers/responseHandlers.js";
import { adoptPetService, createPetService, deletePetService, getManyPetsService, getPetService, updatePetService 
} from "../services/pet.service.js";
import { getPrintableId } from "../utils/service.utils.ts";
import { validationHelper } from "../utils/validation.utils.ts";
import { idValidation } from "../validations/id.validation.js";
import { paramsValidation, petIntegrityValidation, petRegisterValidation, 
petUpdateValidation } from "../validations/pet.validation.js";

export async function getPet(req, res) {
  try {
    const idValidationResult = validationHelper(req?.params || {}, [idValidation]);
    if (idValidationResult) {
      return handleErrorClient(res, 400, "Mascota no identificada", idValidationResult);
    }    

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
    const paramsValidationResult = validationHelper(req?.query || {}, [petIntegrityValidation, paramsValidation]);
    if (paramsValidationResult) {
      return handleErrorClient(res, 400, "Parámetros inválidos", paramsValidationResult);
    }    

    const serviceResult = await getManyPetsService(req?.query?.owner_id || null, 
                                                  req?.query?.species || null, 
                                                  req?.query?.relations);
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
    const validationResult = validationHelper(req?.body || {}, [petIntegrityValidation, petRegisterValidation]);
    if (validationResult) {
      return handleErrorClient(res, 400, validationResult);
    }

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
    const idValidationResult = validationHelper(req?.params || {}, [idValidation]);
    if (idValidationResult) {
      return handleErrorClient(res, 400, "Mascota no identificada", idValidationResult);
    }

    const id = req?.params?.id || 0;

    const validationResult = validationHelper(req?.body || {}, [petIntegrityValidation, petUpdateValidation]);
    if (validationResult) {
      return handleErrorClient(res, 400, validationResult);
    }

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
    const idValidationResult = validationHelper(req?.params || {}, [idValidation]);
    if (idValidationResult) {
      return handleErrorClient(res, 400, "Mascota no identificada", idValidationResult);
    }    

    const id = req?.params?.id || 0;

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
    const idValidationResult = validationHelper(req?.params || {}, [idValidation]);
    if (idValidationResult) {
      return handleErrorClient(res, 400, "Mascota no identificada", idValidationResult);
    }

    const id = req?.params?.id || 0;

    const petToAdopt = await getPetService(id, false);
    if (!(petToAdopt.isSuccess())) {
      return handleErrorClient(res, petToAdopt.statusCode, petToAdopt.message, petToAdopt.data);
    }

    const ownerId = (petToAdopt?.data?.owner_id || 0);
    const userId = (req?.user?.id || 0);

    if (ownerId === userId) {
      return handleErrorClient(res, 409, `${petToAdopt?.data?.name 
        || getPrintableId(id)} ya le pertenece`, petToAdopt.data);
    }
    if (ownerId !== DEFAULT_OWNER) {
      return handleErrorClient(res, 409, `${petToAdopt?.data?.name 
        || getPrintableId(id)} ya tiene dueñ@`, petToAdopt.data);      
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