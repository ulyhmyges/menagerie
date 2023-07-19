import mongoose, {Model, Schema} from "mongoose";
import {Area, areaSchema} from "./area.model";
import {CareBook, careBookSchema} from "./carebook.model";

export interface Animal {
    _id?: string;
    name: string;
    scientificName?: string | null;
    birth: Date;
    gender: Gender;
    carebook: CareBook | null;
    area: Area | null;
}

export enum Gender {
    female = "Female",
    male = "Male"
}
export const animalSchema = new Schema<Animal>({
    name: Schema.Types.String,
    scientificName: Schema.Types.String,
    birth: Schema.Types.Date,
    gender: Schema.Types.String,
    area: areaSchema,
    carebook: careBookSchema
}, {
    collection: 'animals',
    versionKey: false
});

export const AnimalModel: Model<Animal> = mongoose.model('Animal', animalSchema);