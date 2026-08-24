import User from "../entity/user.entity.js";
import { AppDataSource } from "../config/configDb.js";
import {
handleErrorClient,
handleErrorServer,
} from "../handlers/responseHandlers.js";

async function isRole(req, res, next, role) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const userFound = await userRepository.findOneBy({ email: req.user.email });

        if (!userFound) {
        return handleErrorClient(
            res,
            404,
            "Usuario no encontrado en la base de datos",
        );
        }

        const rolUser = userFound.rol;

        if (rolUser !== role) {
            return handleErrorClient(
                res,
                403,
                "Error al acceder al recurso",
                `Se requiere el rol \"${role}\" para realizar esta acción.`
            );
        }
        next();
    } catch (error) {
        return handleErrorServer(
        res,
        500,
        error.message,
        );
    }
}

export async function isAdmin(req, res, next) {
    return await isRole(req, res, next, "administrador");
}