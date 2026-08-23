import Joi from "joi";
import { idValidationFunction } from "./id.validation.js";
import { COLOR_REGEX, MAX_SHORT_STRING, 
    MAX_STRING, MIN_STRING, NAME_REGEX } from "../constants/validation.constants.js";
import { restrictedDateValidationFunction } from "./date.validation.js";
import { MAX_PRICE, MIN_PRICE, VALID_SPECIES } from "../constants/pet.constants.js";

export const petIntegrityValidation = Joi.object({
    id: Joi.custom(idValidationFunction),
    name: Joi.string()
        .min(MIN_STRING)
        .max(MAX_STRING)
        .pattern(NAME_REGEX)
        .messages({
            "string.base": "El nombre debe ser una cadena de caracteres.",
            "string.empty": "El nombre no puede ser vacío.",
            "string.min": `El nombre debe tener por lo menos ${MIN_STRING} caracteres.`,
            "string.max": `El nombre no puede tener más de ${MAX_STRING} caracteres.`,
            "string.pattern.base": "El nombre solo puede tener letras.",
        }),
    date_of_birth: Joi.custom(restrictedDateValidationFunction),
    species: Joi.string().min(MIN_STRING).max(MAX_SHORT_STRING).valid(VALID_SPECIES).messages({
        "string.base": "La especie debe ser una cadena de caracteres.",
        "string.empty": "La especie no puede ser vacía.",
        "string.min": `La especie debe tener por lo menos ${MIN_STRING} caracteres.`,
        "string.max": `La especie no puede tener más de ${MAX_SHORT_STRING} caracteres.`,
        "string.valid": `Solo se permiten las siguientes especies: ${VALID_SPECIES.join(", ")}`,
        "any.valid": `Solo se permiten las siguientes especies: ${VALID_SPECIES.join(", ")}`,
    }),
    breed: Joi.string()
        .min(MIN_STRING)
        .max(MAX_SHORT_STRING)
        .pattern(NAME_REGEX)
        .messages({
            "string.base": "La especie debe ser una cadena de caracteres",
            "string.empty": "La especie no puede ser vacía.",
            "string.min": `La especie debe tener por lo menos ${MIN_STRING} caracteres.`,
            "string.max": `La especie debe tener no puede tener más de ${MAX_SHORT_STRING} caracteres.`,
            "string.pattern.base": "La especie solo puede tener letras.",
        }),
    price: Joi.number().integer().min(MIN_PRICE).max(MAX_PRICE).messages({
        "number.base":"El precio debe ser un número.",
        "number.integer":"El precio debe ser un número entero.",
        "number.min":`El precio debe ser mayor o igual a $${MIN_PRICE}.`,
        "number.max":`El precio debe ser menor o igual a $${MAX_PRICE}.`,
    }),
    description: Joi.string()
        .min(MIN_STRING)
        .max(MAX_STRING)
        .pattern(NAME_REGEX)
        .messages({
            "string.base": "La descripción debe ser una cadena de caracteres.",
            "string.empty": "La descripción no puede ser vacía.",
            "string.min": `La descripción debe tener por lo menos ${MIN_STRING} caracteres.`,
            "string.max": `La descripción no puede tener más de ${MAX_STRING} caracteres.`,
            "string.pattern.base": "La descripción solo puede tener letras.",
        }),
    neutered: Joi.boolean().messages({
        "boolean.base":"Una mascota solo puede ser esterilizada o no esterilizada.",
    }),
    vaccinated: Joi.boolean().messages({
        "boolean.base":"Una mascota solo puede estar vacunada o no vacunada.",
    }),
    special_needs: Joi.boolean().messages({
        "boolean.base":"Una mascota solo puede requerir atención especial o no.",
    }),
    declawed: Joi.boolean().messages({
        "boolean.base":"Una mascota solo puede estar desgarrada o no.",
    }),
    color: Joi.string().min(6).max(6).regex(COLOR_REGEX).messages({
        "string.base":"El color debe ser una cadena de caracteres.",
        "string.empty":"El color debe ser exactamente de 6 caracteres.",
        "string.min":"El color debe ser exactamente de 6 caracteres.",
        "string.max":"El color debe ser exactamente de 6 caracteres.",
        "string.pattern.base":"El color debe estar en formato hexadecimal.",
    }),
    createdAt: Joi.string().min(MIN_STRING).max(MAX_STRING).isoDate().messages({
        "string.base":"La fecha de creación debe ser una cadena de caracteres.",
        "string.empty": "La fecha de creación no puede ser vacía.",
        "string.min": `La fecha de creación debe tener por lo menos ${MIN_STRING} caracteres.`,
        "string.max": `La fecha de creación no puede tener más de ${MAX_STRING} caracteres.`,
        "string.isoDate": "La fecha de creación debe ser una fecha.",
    }),
    updatedAt: Joi.string().min(MIN_STRING).max(MAX_STRING).isoDate().messages({
        "string.base":"La fecha de actualización debe ser una cadena de caracteres.",
        "string.empty": "La fecha de actualización no puede ser vacía.",
        "string.min": `La fecha de actualización debe tener por lo menos ${MIN_STRING} caracteres.`,
        "string.max": `La fecha de actualización no puede tener más de ${MAX_STRING} caracteres.`,
        "string.isoDate": "La fecha de actualización debe ser una fecha.",
    }),    
});

export const petRegisterValidation = Joi.object({
    name: Joi.any().required().messages({
        "any.required": "El nombre es obligatorio.",
    }),
    date_of_birth: Joi.any().required().messages({
        "any.required": "La fecha de nacimiento es obligatoria.",
    }),
    species: Joi.any().required().messages({
        "any.required": "La especie es obligatoria.",
    }),
    breed: Joi.any().required().messages({
        "any.required": "La raza es obligatoria.",
    }),
    price: Joi.any().required().messages({
        "any.required": "El precio es obligatorio.",
    }),
    description: Joi.any().required().messages({
        "any.required": "La descripción es obligatoria.",
    }),
    neutered: Joi.any().required().messages({
        "any.required": "El estado de castramiento es obligatorio.",
    }),
    vaccinated: Joi.any().required().messages({
        "any.required": "El estado de vacunamiento es obligatorio.",
    }),
    special_needs: Joi.any().required().messages({
        "any.required": "El estado mental es obligatorio.",
    }),
    declawed: Joi.any().required().messages({
        "any.required": "El estado de desgarramiento es obligatorio.",
    }),
    color: Joi.any().required().messages({
        "any.required": "El color es obligatorio.",
    }),   
}).unknown(false).messages({
    "any.unknown": "No se permiten campos adicionales.",
    "object.unknown": "No se permiten campos adicionales.",
});

export const petUpdateValidation = Joi.object({
    name: Joi.any(),
    date_of_birth: Joi.any(),
    species: Joi.any(),
    breed: Joi.any(),
    price: Joi.any(),
    description: Joi.any(),
    neutered: Joi.any(),
    vaccinated: Joi.any(),
    special_needs: Joi.any(),
    declawed: Joi.any(),
    color: Joi.any(),
}).unknown(false).min(1).messages({
    "any.unknown": "No se permiten campos adicionales.",
    "object.unknown": "No se permiten campos adicionales.",
    "object.min": "Debe proporcionar al menos un campo para actualizar.",
});