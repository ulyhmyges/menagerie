import mongoose, {Model, Schema} from "mongoose";
import {Animal, Area} from "./interfaces";
import {areaSchema} from "./area.model";
import {careBookSchema} from "./carebook.model";

export const animalSchema = new Schema<Animal>({
    name: Schema.Types.String,
    scientificName: Schema.Types.String,
    birth: Schema.Types.Date,
    gender: Schema.Types.String,
    area: areaSchema,
    carebook: careBookSchema
})

export const AnimalModel: Model<Animal> = mongoose.model('Animal', animalSchema);