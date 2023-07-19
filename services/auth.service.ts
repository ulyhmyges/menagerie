import {Model} from "mongoose";
import {User, UserModel} from "../models";

export class AuthService {
    readonly userModel: Model<User>;

    constructor() {
        this.userModel = UserModel;
    }

    async createUser(user: User): Promise<User | null> {
        try {
            return await this.userModel.create(user)
        } catch (e: unknown) {
            console.log(e + 'error create')
            return null;
        }
    }

    async updateUser(filter: object, user: User): Promise<User | null> {
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

    async findUser(filter: object): Promise<User | null> {
        try {
            return await this.userModel.findOne(filter);
        } catch (e: unknown) {
            return null;
        }
    }

    async findUsers(filter: object): Promise<User[] | null> {
        try {
            return await this.userModel.find(filter).exec();
        } catch (e: unknown) {
            return null;
        }
    }

}
