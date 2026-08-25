import { logout } from "../services/auth.service.js";
import { useNavigate } from "react-router-dom";

export const useLogoutSubmit = () => {
    try {
        const navigate = useNavigate();
        logout();
        navigate('/'); 
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
};