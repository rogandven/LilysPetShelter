"use strict";

import ServiceResponse from "../classes/ServiceResponse.ts";
import { AppDataSource } from "../config/configDb.js";
import Pet from "../entity/pet.entity.js";
import { getPrintableId } from "../utils/service.utils.ts";

const petRepository = AppDataSource.getRepository(Pet);

export const getPetService = async (petId) => {
    try {
        const pet = await petRepository.findOne({ where: { id: petId } } );
        return new ServiceResponse(
            pet ? 200 : 404, 
            pet ? `¡${pet.name || getPrintableId(Number(petId))} encontrad@ con éxito!` 
            : `${getPrintableId(petId)} no encontrad@`,
            pet
        );
    } catch (error) {
        console.error(error);
        return new ServiceResponse(500, `Error al encontrar a ${getPrintableId(Number(petId))}`, null);
    }
};

export const getManyPetsService = async (userId, breed) => {
    try {
        const pets = await petRepository.find( { where: {
            owner_id: (userId ? userId : undefined),
            breed: (breed ? breed : undefined),
        } } );
        const isEmpty = (!pets || (pets.length === 0));

        return new ServiceResponse(
            isEmpty ? 204 : 200, 
            isEmpty ? "No hay mascotas para mostrar" : "¡Mascotas encontradas con éxito!",
            pets
        );
    } catch (error) {
        console.error(error);
        return new ServiceResponse(500, "Error al encontrar mascotas", null);
    }
};

export const createPetService = async (data) => {
    try {
        const savedPet = await petRepository.save(petRepository.create(data));

        return new ServiceResponse(
            (!savedPet) ? 204 : 201,
            (!savedPet) ? "No se pudo crear ninguna mascota" : "¡Mascota creada con éxito!",
            (!savedPet) ? null : savedPet
        );
    } catch (error) {
        console.error(error);
        return new ServiceResponse(500, "Error al registrar mascota", null);
    }
};

export const updatePetService = async (id, oldData, newData) => {
    try {
        const editedPet = Object.assign({}, oldData, newData);
        const savedPet = await petRepository.save(editedPet);
        return new ServiceResponse(200, "¡Mascota actualizada con éxito!", editedPet);
    } catch (error) {
        console.error(error);
        return new ServiceResponse(500, `Error al actualizar a ${getPrintableId(id)}`, null);
    }
};

export const deletePetService = async (id, oldData) => {
    try {
        const deletedPet = await petRepository.delete({ id: id });
        if (deletedPet.affected !== 1) {
            return new ServiceResponse(500, 
                `No se ha podido borrar a ${oldData?.name || getPrintableId(id)}`, null);
        }
        return new ServiceResponse(200, 
            `¡${oldData?.name || getPrintableId(id)} eliminad@ con éxito!`, null);
    } catch (error) {
        console.error(error);
        return new ServiceResponse(500, `Error al eliminar a ${getPrintableId(id)}`, null);
    }
};

export const adoptPetService = async (userId, petData) => {
    return await updatePet(petData?.id || 0, petData, { owner_id : userId });  
};