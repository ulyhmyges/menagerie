import mongoose, {Model, Schema} from "mongoose";
import {Staff} from "./interfaces";
import {YearFull, YearOff} from "./classes";


const staffSchema = new Schema<Staff>({
    name: Schema.Types.String,
    type: Schema.Types.String,
    availability: { type: Schema.Types.Mixed, default: new YearOff() }
})

export const StaffModel: Model<Staff> = mongoose.model('Staff', staffSchema);