import { NavLink, useLocation } from "react-router-dom";
import DATA from "../data/DATA.tsx";
import { FaAlignJustify } from "react-icons/fa";

const Navbar = () => {
    const location = useLocation();
    const storedUser = JSON.parse(sessionStorage.getItem('usuario'));
    const userRole = storedUser?.rol; 

    const ICON = DATA.PROJECT_ICON;

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                    <FaAlignJustify className="h-5 w-5" />
                </div>
                <ul
                    tabIndex={-1}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    {DATA.ROUTES.map((route, key) => {
                        const isCurrentSite = location.pathname === route.destination;
                        const isAllowed = route.allowedRoles !== null ? (route.allowedRoles.includes(userRole)) : true;
                        console.log("ROL USUARIO", userRole, "ROLES PERMITIDOS", route.allowedRoles, "ISALLOWED", isAllowed);
                        
                        const ROUTE_ICON = route.icon;

                        return (
                            isAllowed && <li
                                key={"navbar-link-" + key}
                                className={
                                    isCurrentSite ? "disabled opacity-50" : ""
                                }
                            >
                                { 
                                    !isCurrentSite ?
                                    (
                                        <NavLink to={route.destination}>
                                            <ROUTE_ICON />{route.label}
                                        </NavLink>
                                    ) : (
                                        <span><ROUTE_ICON />{route.label}</span>
                                    )
                                }
                            </li>
                        )
                    })}
                </ul>
                </div>
            </div>
            <div className="navbar-center">
                {location.pathname !== DATA.ROUTES[0].destination ? 
                    <NavLink className="btn btn-ghost text-xl">
                        <ICON />{DATA.PROJECT_NAME}
                    </NavLink>
                    :
                    <div className="btn btn-ghost btn-disabled text-xl">
                        <ICON />{DATA.PROJECT_NAME}
                    </div>                    
                }
            </div>
            <div className="navbar-end">
            </div>
        </div>       
    );
};

export default Navbar;
