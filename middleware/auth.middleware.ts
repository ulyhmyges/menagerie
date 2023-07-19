import {User} from "../models";
import {RequestHandler} from "express";
import {ExpressUtils} from "../utils/express.utils";
import {AuthService} from "../services";
import {Request, Response} from 'express';

declare module 'express' {
    export interface Request {
        user?: User
    }
}

export function checkAuthToken(): RequestHandler {
    return async function(req: Request, res, next) {
        const authorization: string | undefined = req.headers.authorization;
        if(authorization === undefined) {
            return ExpressUtils.unauthorized(res);
        }
        const parts = authorization.split(' ');
        if(parts.length !== 2 || parts[0] !== 'Bearer') {
            return ExpressUtils.unauthorized(res);
        }
        const token = parts[1];
        const authService = new AuthService();
        const session = await authService.findSession(token);
        if(!session) {
            return ExpressUtils.unauthorized(res);
        }
        req.user = session.user as User;
        next();
    };
}