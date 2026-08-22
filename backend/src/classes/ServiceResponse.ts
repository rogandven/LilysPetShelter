import { isInRange, normalizeStatusCode } from "../utils/service.utils";

export class ServiceResponse {
    private _statusCode: number = 500;
    private _message: string = "Error interno del servidor";
    private _data: any = null;

    set statusCode(statusCode: number) {
        this._statusCode = normalizeStatusCode(statusCode);
    }
    get statusCode(): number {
        return this._statusCode;
    }

    set data(data: any) {
        this._data = data;
    }
    get data(): any {
        return this._data;
    }

    set message(message: string) {
        this._message = message;
    }
    get message(): string {
        return this._message;
    }

    public isServerError(): boolean {
        return isInRange(this._statusCode, 500, 600);
    }

    public isClientError(): boolean {
        return isInRange(this._statusCode, 400, 499);
    }

    public isError(): boolean {
        return this.isServerError() || this.isClientError();
    }

    public isSuccess(): boolean {
        return !this.isError();
    }

    constructor(statusCode: number = 500, message: string = "Error interno del servidor", data: any = null) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}

export default ServiceResponse;