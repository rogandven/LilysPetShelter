import { FaCertificate, FaHome, FaPaw } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import RouteClass from "../classes/RouteClass.tsx";
import { useLogoutSubmit } from "../hooks/useLogoutSubmit.jsx";

export const DATA = {
    PROJECT_NAME: "Lily's Pet Shop",
    PROJECT_ICON: FaPaw,
    ROUTES: [
        RouteClass.PublicRouteClass("Inicio", FaHome, "/home", null),
        RouteClass.PrivateRouteClass("Admin", FaCertificate, "/admin", ["administrador"], null),
        RouteClass.PublicRouteClass("Cerrar Sesión", MdLogout, "/", useLogoutSubmit),
    ],
};

export default DATA;