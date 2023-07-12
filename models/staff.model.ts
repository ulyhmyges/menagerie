import mongoose, {Model, Schema} from "mongoose";
import {EmployeeType, Staff} from "./interfaces";

const staffSchema = new Schema<Staff>({
    name: Schema.Types.String,
    type: Schema.Types.String,
    availability: Schema.Types.Mixed
})

export const StaffModel: Model<Staff> = mongoose.model('Staff', staffSchema);