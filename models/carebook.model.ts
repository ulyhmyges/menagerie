import mongoose, {Model, Schema} from "mongoose";
import {Animal} from "./animal.model";
import {Treatment} from "./treatment.model";

export interface Carebook {
    _id?: string;
    owner: Animal;
    start: string;
    health: Wellbeing;
    treatments: Treatment[]
}

export enum Wellbeing {
    healthy = "Healthy",
    unwell = "Unwell",
    week = "Week",
    diseased = "Diseased",
    dead = "Dead"
}


export const carebookSchema = new Schema<Carebook>({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Animal',
        required: true
    },
    start: Schema.Types.String,
    health: Schema.Types.String,
    treatments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Treatment',
            required: false
        }]
}, {
    collection: 'carebooks',
    versionKey: false
});

export const CarebookModel: Model<Carebook> = mongoose.model('Carebook', carebookSchema);