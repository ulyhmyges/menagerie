import {isValidObjectId, Model} from "mongoose";
import {User, UserModel} from "../models";
import {SecurityUtils} from "../utils";
import {Session, SessionModel} from "../models/session.model";

export class AuthService {
    readonly userModel: Model<User>;
    readonly sessionModel: Model<Session>;

    constructor() {
        this.userModel = UserModel;
        this.sessionModel = SessionModel;
    }

    async create(user: User): Promise<User | null> {
        try {
            return await this.userModel.create({
                login: user.login,
                password: SecurityUtils.toSHA512(user.password),
                type: user.type
            })
        } catch (e: unknown) {
            console.log(e + 'error create')
            return null;
        }
    }

    async update(filter: object, user: User): Promise<User | null> {
        try {
            return await this.userModel.findOneAndUpdate(filter, {
                login: user.login,
                password: SecurityUtils.toSHA512(user.password),
                type: user.type
            })
        } catch (e: unknown) {
            console.error("error message", e)
            return null;
        }
    }

    async findOne(user: User): Promise<User | null> {
        try {
            return await this.userModel.findOne({
                login: user.login,
                password: SecurityUtils.toSHA512(user.password),
                type: user.type
            }).exec();
        } catch (e: unknown) {
            return null;
        }
    }

    async findById(id: any) : Promise<User | null> {
        try {
            return await this.userModel.findById(id).exec();
        } catch (e: unknown) {
            return null;
        }
    }

    async find(filter: object): Promise<User[] | null> {
        try {
            return await this.userModel.find(filter).exec();
        } catch (e: unknown) {
            return null;
        }
    }

    async createSession(user: User, platform?: string): Promise<Session | null> {
        return await this.sessionModel.create({
            platform,
            user: user._id
        })
    }

    async findSession(token: string) : Promise<Session | null> {
        // permet d'éviter que le findById plante lorsque l'_id n'est pas un ObjectId vali
        if (!isValidObjectId(token)) {
            return null;
        }
        return await this.sessionModel.findOne({_id: token}).populate('user').exec();
    }
}
