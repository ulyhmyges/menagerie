import {AuthService} from "../services/auth.service";
import {ExpressController} from "./controller.interface";
import * as express from "express";
import {Request, Response} from "express";
import {User} from "../models";

export class UserController implements ExpressController {
    readonly _path: string;
    readonly _authService: AuthService;

    constructor() {
        this._path = '/auth'
        this._authService = new AuthService();
    }

    async subscribe(req: Request, res: Response) {
        const user = await this._authService.createUser({
            login: req.body.login,
            password: req.body.password,
            type: req.body.type
        })
        res.json(user);
    }

    async updateUserById(req: Request, res: Response) {
        const update: User = {
            login: req.body.login,
            password: req.body.password,
            type: req.body.type
        }
        const user = await this._authService.updateUser({_id: req.params.id}, update);
        const updateUser = await this._authService.findUser({_id: req.params.id});
        res.json(updateUser);
    }

    async getAll(req: Request, res: Response) {
        const users = await this._authService.findUsers({});
        res.json(users);
    }
    buildRoutes(): express.Router {
        const router = express.Router();
        router.post('/', express.json(), this.subscribe.bind(this));
        router.put('/user/update/:id', express.json(), this.updateUserById.bind(this));
        router.get('/users', this.getAll.bind(this));
        return router;
    }
}