import {User} from "./user.model";
import mongoose, {Model, Schema} from "mongoose";

export interface Session {
    _id?: string,
    platform?: string,
    user: string | User
}

export const sessionSchema = new Schema<Session>({
    platform: {
        type: Schema.Types.String
    },
    user : {
        type: Schema.Types.ObjectId,
        ref: 'User', // num du model mongoose
        required: true,
    }
}, {
    collection: 'sessions',
    versionKey: false
});

export const SessionModel: Model<Session> = mongoose.model('Session', sessionSchema);