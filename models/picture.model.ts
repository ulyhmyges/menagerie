import mongoose, {Model, Schema} from "mongoose";
import {Picture} from "./interfaces";

export const pictureSchema = new Schema<Picture>({
    title: Schema.Types.String,
    name: Schema.Types.String,
    src: Schema.Types.String,
    description: Schema.Types.String
});

export const PictureModel: Model<Picture> = mongoose.model('Picture', pictureSchema);