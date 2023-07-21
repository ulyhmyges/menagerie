
import {AuthService} from "../services";
import {ExpressController} from "./controller.interface";
import * as express from "express";
import {Request, Response} from "express";
import {User} from "../models";
import {ExpressUtils} from "../utils/express.utils";
import {SecurityUtils} from "../utils";
import {checkAuthToken} from "../middleware";

export class UserController implements ExpressController {
    readonly _path: string;
    readonly _authService: AuthService;

    constructor() {
        this._path = '/auth'
        this._authService = new AuthService();
    }

    async subscribe(req: Request, res: Response) {
        if (ExpressUtils.isString(res, req.body.login, 4, 30) &&
            ExpressUtils.isString(res, req.body.password, 8)) {
            const user = await this._authService.create({
                login: req.body.login,
                password: req.body.password,
                type: req.body.type
            })
            if (!user) {
                return ExpressUtils.conflict(res);
            }
            res.json(user);
        }
    }

    /**
     * find user, create a session and return a token = session _id
     */
    async login(req: Request, res: Response) {
        if (ExpressUtils.isString(res, req.body.login, 4, 30) &&
            ExpressUtils.isString(res, req.body.password, 8)) {

            const user = await this._authService.findOne({
                login: req.body.login,
                password: req.body.password,
                type: req.body.type
            })
            if (!user) {
                return ExpressUtils.unauthorized(res);
            }

            const platform = req.headers["user-agent"];
            const session = await this._authService.createSession(user, platform);
            if(!session) {
                return ExpressUtils.internalServerError(res);
            }

            res.json({token: session._id} );
        }
    }

    async me(req: Request, res: Response) {
        res.json(req.user);
    }
    async updateUserById(req: Request, res: Response) {
        const update: User = {
            login: req.body.login,
            password: req.body.password,
            type: req.body.type
        }
        const user = await this._authService.update({_id: req.params.id}, update);
        const updateUser = await this._authService.findById(req.params.id);
        res.json(updateUser);
    }

    async getUser(req: Request, res: Response) {
        const user = await this._authService.findById(req.params.id);
        res.json(user);
    }

    async getAll(req: Request, res: Response) {
        const users = await this._authService.find({});
        res.json(users);
    }
    buildRoutes(): express.Router {
        const router = express.Router();
        router.post('/subscribe', express.json(), this.subscribe.bind(this));
        router.post('/login', express.json(), this.login.bind(this));
        router.get('/me', checkAuthToken() ,this.me.bind(this));

        // à tester
        router.put('/users/update/:id', express.json(), this.updateUserById.bind(this));
        router.get('/users', this.getAll.bind(this));
        router.get('/users/:id', this.getUser.bind(this));
        return router;
    }
}