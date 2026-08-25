import { IconType } from "react-icons";
import { FaExclamationTriangle } from "react-icons/fa";

export default class RouteClass {
    private _label: string = "Ejemplo";
    private _icon: IconType = FaExclamationTriangle;
    private _destination: string = "/";
    private _allowedRoles: string[] | null = null;
    private _onClick: Function | null = null;

    private set label(label: string) {
        this._label = label;
    }
    get label() {
        return this._label;
    }

    private set icon(icon: IconType) {
        this._icon = icon;
    }
    get icon() {
        return this._icon;
    }
    
    private set destination(destination: string) {
        this._destination = destination;
    }
    get destination() {
        return this._destination;
    }
    
    private set allowedRoles(allowedRoles: string[] | null) {
        this._allowedRoles = allowedRoles;
    }
    get allowedRoles() {
        return this._allowedRoles;
    }

    private set onClick(onClick: Function | null) {
        this._onClick = onClick;
    }
    get onClick() {
        return this._onClick;
    }
    
    private constructor(label: string, icon: IconType, destination: string, allowedRoles: string[] | null, onClick: Function | null) {
        this.label = label;
        this.icon = icon;
        this.destination = destination;
        this.allowedRoles = allowedRoles;
        this._onClick = onClick;
    }

    static PublicRouteClass(label: string, icon: IconType, destination: string, onClick: Function | null) {
        return new RouteClass(label, icon, destination, null, onClick);
    }

    static PrivateRouteClass(label: string, icon: IconType, destination: string, allowedRoles: string[], onClick: Function | null) {
        return new RouteClass(label, icon, destination, allowedRoles, onClick);
    }    
}