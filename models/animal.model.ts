import mongoose, {Model, Schema} from "mongoose";
import {Area} from "./area.model";
import {Carebook} from "./carebook.model";


export interface Animal {
    _id?: string;
    name: string;
    scientificName?: string | null;
    birth: string;
    gender: Gender;
    carebook: string | Carebook;
    area: string | Area;
}

export enum Gender {
    female = "Female",
    male = "Male"
}
export const animalSchema = new Schema<Animal>({
    name: Schema.Types.String,
    scientificName: Schema.Types.String,
    birth: Schema.Types.String,
    gender: Schema.Types.String,
    area: {
        type: Schema.Types.ObjectId,
        ref: 'Area',
        required: true,
    },
    carebook: {
        type: Schema.Types.ObjectId,
        ref: 'Carebook',
        required: true
    }
}, {
    collection: 'animals',
    versionKey: false
});

export const AnimalModel: Model<Animal> = mongoose.model('Animal', animalSchema);