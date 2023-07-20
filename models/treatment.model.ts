import mongoose, {Model, Schema} from "mongoose";
import {Animal} from "./animal.model";
import {Veterinary} from "./classes";

export interface Treatment {
    _id?: string;
    animal: string | Animal;
    date: string; // AAAA-MM-JJ
    place: string;
    description: string;
    veterinary: string | Veterinary;
}

const treatmentSchema = new Schema<Treatment>({
    animal: {
        type: Schema.Types.ObjectId,
        ref: 'Animal',
        required: true
    },
    date: {
        type: Schema.Types.String,
        required: true
    },
    description: {
        type: Schema.Types.String,
        required: true,
    },
    veterinary: {
        type: Schema.Types.ObjectId,
        ref: 'Staff',
        required: true
    },
    place: {
        type: Schema.Types.String,
        required: false
    }
})

export const TreatmentModel: Model<Treatment> = mongoose.model('Treatment', treatmentSchema);
