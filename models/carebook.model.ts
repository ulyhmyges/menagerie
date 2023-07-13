import {CareBook, Treatment, Wellbeing} from "./interfaces/carebook.interface";
import mongoose, {Model, Schema} from "mongoose";
import {animalSchema} from "./animal.model";

export const careBookSchema = new Schema<CareBook>({
    owner: animalSchema,
    start: Schema.Types.Date,
    end: Schema.Types.Date,
    place: Schema.Types.String,
    health: Schema.Types.String,
    appointment: Schema.Types.Date,
    treatments: Schema.Types.Mixed
})

export const CareBookModel: Model<CareBook> = mongoose.model('CareBook', careBookSchema);