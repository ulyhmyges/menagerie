import mongoose, {Model, Schema} from "mongoose";
import {Animal} from "./animal.model";
import {Veterinary} from "./classes";

export enum Wellbeing {
    healthy = "Healthy",
    unwell = "Unwell",
    week = "Week",
    diseased = "Diseased",
    dead = "Dead"
}
export interface CareBook {
    _id?: string;
    owner: Animal;
    start: Date;
    health: Wellbeing;
    appointment: Date;
    treatments: Treatment[]
}

export interface Treatment {
    _id?: string;
    animal: Animal;
    date: Date;
    place: string;
    description: string;
    veterinary: Veterinary | null;
}

export const careBookSchema = new Schema<CareBook>({
    owner: Schema.Types.Mixed,
    start: Schema.Types.Date,
    health: Schema.Types.String,
    appointment: Schema.Types.Date,
    treatments: Schema.Types.Mixed
}, {
    collection: 'carebooks',
    versionKey: false
});

export const CareBookModel: Model<CareBook> = mongoose.model('CareBook', careBookSchema);