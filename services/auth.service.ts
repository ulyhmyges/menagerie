import {Model} from "mongoose";
import {User, UserModel} from "../models";

export class AuthService {
    readonly userModel: Model<User>;

    constructor() {
        this.userModel = UserModel;
    }

    async create(user: User): Promise<User | null> {
        try {
            return await this.userModel.create(user)
        } catch (e: unknown) {
            console.log(e + 'error create')
            return null;
        }
    }

    async update(filter: object, user: User): Promise<User | null> {
        try {
            return await this.userModel.findOneAndUpdate(filter, {
                login: user.login,
                password: user.password,
                type: user.type
            })
        } catch (e: unknown) {
            return null;
        }
    }

    async findOne(filter: object): Promise<User | null> {
        try {
            return await this.userModel.findOne(filter);
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

}
