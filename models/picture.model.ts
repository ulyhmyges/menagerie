import mongoose, {Model, Schema} from "mongoose";

export interface Picture {
    _id?: string;
    title: string;
    name: string;
    src: string;
    description: string;
}
export const pictureSchema = new Schema<Picture>({
    title: Schema.Types.String,
    name: Schema.Types.String,
    src: Schema.Types.String,
    description: Schema.Types.String
}, {
    collection: 'pictures',
    versionKey: false
});

export const PictureModel: Model<Picture> = mongoose.model('Picture', pictureSchema);