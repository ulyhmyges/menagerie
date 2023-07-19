import mongoose, {Model, Schema} from "mongoose";
import {YearOff} from "./classes";

export interface Day {
    available: boolean,
    time: {begin: number | null, end: number | null}
}

export interface Week {
    index?: number,
    available?: boolean,
    monday?: Day,
    tuesday?: Day,
    wednesday?: Day,
    thursday?: Day,
    friday?: Day,
    saturday?: Day,
    sunday?: Day,
}

export interface Availability {
    available: boolean,
    weeks?: Week[]
}

export enum EmployeeType {
    zookeeper= "Zookeeper",
    veterinary = "Veterinary",
    host = "Host",
    janitor = "Janitor",
    salesman = "Salesman"
}

export interface Staff {
    _id?: string,
    name: string;
    type?: EmployeeType;
    availability?: Availability
}

const staffSchema = new Schema<Staff>({
    name: Schema.Types.String,
    type: Schema.Types.String,
    availability: { type: Schema.Types.Mixed }
}, {
    collection: 'staffs',
    versionKey: false
});

export const StaffModel: Model<Staff> = mongoose.model('Staff', staffSchema);