import mongoose, {Model, Schema} from "mongoose";

export interface User {
    _id?: string,
    login: string,
    password: string,
    type: UserType
}

export enum UserType {
    customer = "Customer",
    employee = "Employee",
    administrator = "Administrator"
}

export const userSchema = new Schema<User>({
    login: {
        type: Schema.Types.String,
        unique: true,
        required: true
    },
    password: {
        type: Schema.Types.String,
        required: true
    },
    type: {
        type: Schema.Types.String,
        required: false
    },
},
    {
        collection: 'users',
        versionKey: false
    });

export const UserModel: Model<User> = mongoose.model('User', userSchema);