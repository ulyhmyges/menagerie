
import mongoose, {Model, Schema} from "mongoose";
import {CareBook} from "./interfaces";


export const careBookSchema = new Schema<CareBook>({
    owner: Schema.Types.Mixed,
    start: Schema.Types.Date,
    health: Schema.Types.String,
    appointment: Schema.Types.Date,
    treatments: Schema.Types.Mixed
})

export const CareBookModel: Model<CareBook> = mongoose.model('CareBook', careBookSchema);