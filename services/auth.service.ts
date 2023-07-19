import {Model} from "mongoose";
import {User, UserModel} from "../models";
import {SecurityUtils} from "../utils/security.util";

export class AuthService {
    readonly userModel: Model<User>;

    constructor() {
        this.userModel = UserModel;
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

    async find(filter: User): Promise<User[] | null> {
        try {
            return await this.userModel.find({
                login: filter.login,
                password: SecurityUtils.toSHA512(filter.password),
                type: filter.type
            }).exec();
        } catch (e: unknown) {
            return null;
        }
    }

}
