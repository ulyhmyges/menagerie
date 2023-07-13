import mongoose, {Model, Schema} from "mongoose";
import {Area} from "./interfaces";
import {pictureSchema} from "./picture.model";


export const areaSchema = new Schema<Area>({
    name: Schema.Types.String,
    available: Schema.Types.Boolean,
    description: Schema.Types.String,
    type: Schema.Types.String,
    capacity: Schema.Types.Number,
    openingHours: Schema.Types.Mixed,
    disabledAccess: Schema.Types.Boolean,
    pictures: [pictureSchema]
})

export const AreaModel: Model<Area> = mongoose.model('Area', areaSchema);