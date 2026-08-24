import { MAX_MONTH, MAX_YEAR, MIN_DAY, MIN_MONTH, MIN_YEAR } from "../constants/validation.constants.js";
import { isInRange } from "../utils/general.utils.ts";

const generalDateValidationFunction = (value, helpers, allowFuture) => {
    try {
        if (typeof(value) !== "string") {
            return helpers.message("La fecha debe ser una cadena de caracteres.");
        }
        const dateArray = value.split("-");
        if (dateArray.length !== 3) {
            return helpers.message("La fecha debe estar en formato AAAA-MM-DD.");
        }

        let [year, month, day] = dateArray;

        if ((year = Number(year)) !== Math.abs(Math.round(year))) {
            return helpers.message("El año debe ser positivo y entero.");
        }
        if ((month = Number(month)) !== Math.abs(Math.round(month))) {
            return helpers.message("El mes debe ser positivo y entero.");
        }   
        if ((day = Number(day)) !== Math.abs(Math.round(day))) {
            return helpers.message("El día debe ser positivo y entero.");
        }       

        if (!isInRange(year, MIN_YEAR, MAX_YEAR)) {
            return helpers.message("Año fuera de rango.");
        }
        if (!isInRange(month, MIN_MONTH, MAX_MONTH)) {
            return helpers.message("Mes fuera de rango.");
        }
        if (!isInRange(day, MIN_DAY, MAX_DAY)) {
            return helpers.message("Día fuera de rango.");
        }            
        const dateObject = new Date(year, month, day);
        if (dateObject.toString().toUpperCase().trim() === "INVALID DATE") {
            return helpers.message("Fecha no válida.");
        }

        if (!allowFuture && (dateObject.getTime() > Date.now())) {
            return helpers.message("No se permiten las fechas futuras.");
        }
    } catch (error) {
        console.error(error);
        return helpers.message("Fecha desconocida");
    }

    return true;
}

export const dateValidationFunction = (value, helpers) => {
    return generalDateValidationFunction(value, helpers, true);
}

export const restrictedDateValidationFunction = (value, helpers) => {
    return generalDateValidationFunction(value, helpers, false);
}