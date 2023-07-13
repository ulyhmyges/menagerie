import {Model} from "mongoose";
import {Area, AreaModel} from "../models";
export class AreaService {
    readonly areaModel: Model<Area>;

    constructor() {
        this.areaModel = AreaModel;
    }

    async createArea(area: Area): Promise<Area | null> {
        try {
            return await this.areaModel.create({
                name: area.name,
                available: area.available,
                description: area.description,
                type: area.type,
                capacity: area.capacity,
                openingHours: area.openingHours,
                disabledAccess: area.disabledAccess,
                pictures: area.pictures
            });
        } catch (e: unknown) {
            console.log(e)
            return null;
        }
    }

    async updateArea(filter: object, update: object): Promise<Area | null> {
        try {
            return await this.areaModel.findOneAndUpdate(filter, update);
        } catch (e: unknown) {
            console.log(e + "error updataOne")
            return null;
        }
    }

    async deleteArea(conditions: object): Promise<Area | null> {
        try {
            return await this.areaModel.findOneAndDelete(conditions);
        } catch (e: unknown) {
            console.log(e + "error deleteOne")
            return null;
        }
    }

    async findArea(filter: object): Promise<Area | null> {
        try {
            console.log(filter)
            return await this.areaModel.findOne(filter);
        } catch (e: unknown) {
            console.log(e + "error findOne");
            return null;
        }
    }

    async findAreas(filter: object): Promise<Area[] | null>{
        try {
            return await this.areaModel.find(filter).exec();
        } catch (e: unknown) {
            console.log(e + "error find")
            return null;
        }
    }
}
