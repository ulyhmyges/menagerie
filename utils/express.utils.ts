import {Response} from "express";

export class ExpressUtils {

    private constructor() {}
    public static isString(res: Response, value: unknown, minlength?: number, maxlength?: number ) : boolean {
        if (typeof value != 'string') {
            this.badRequest(res);
            return false
        }
        if (minlength !== undefined && value.length < minlength) {
            this.badRequest(res);
            return false;
        }
        if (maxlength !== undefined && value.length > maxlength) {
            this.badRequest(res);
            return false;
        }
        return true;
    }

    public static isNumber(res: Response, value: unknown, min?: number, max?: number){
        if (typeof value !== 'number') {
            this.badRequest(res);
            return false;
        }
        if (min !== undefined && value < min) {
            this.badRequest(res);
            return false;
        }
        if (max !== undefined && value > max) {
            this.badRequest(res);
            return false;
        }
        return true;
    }

    /**
     * https://developer.mozilla.org/fr/docs/Web/HTTP/Status
     * @param res
     */
    public static badRequest(res: Response) {
        console.log("bad request error 400")
        res.status(400).end();
    }

    public static unauthorized(res: Response) {
        res.status(401).end();
    }

    public static conflict(res: Response) {
        res.status(409).end();
    }

    public static internalServerError(res: Response) {
        res.status(500).end();
    }

}