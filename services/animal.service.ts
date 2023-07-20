import {Model} from "mongoose";
import {Animal, AnimalModel} from "../models";
export class AnimalService {
    readonly animalModel: Model<Animal>;

    constructor() {
        this.animalModel = AnimalModel;
    }

    async create(animal: Animal): Promise<Animal | null> {
        try {
            const date: Date = animal.birth ? new Date(animal.birth) : new Date();

            return await this.animalModel.create({
                name: animal.name,
                scientificName: animal.scientificName,
                birth:  date.toLocaleDateString(),
                gender: animal.gender,
                carebook: animal.carebook,
                area: animal.area
            })
        } catch (e: unknown) {
            console.log(e)
            return null;
        }
    }

    async update(filter: object, update: object): Promise<Animal | null> {
        try {
            return await this.animalModel.findOneAndUpdate(filter, update);
        } catch (e: unknown) {
            console.error();
            return null;
        }
    }

    async delete(conditions: object): Promise<Animal | null> {
        try {
            return await this.animalModel.findOneAndDelete(conditions);
        } catch (e: unknown) {
            console.log(e + "error deleteOne")
            return null;
        }
    }

    async findOne(filter: object): Promise<Animal | null> {
        try {
            console.log(filter)
            return await this.animalModel.findOne(filter);
        } catch (e: unknown) {
            console.error(e);
            return null;
        }
    }

    async find(filter: object): Promise<Animal[] | null>{
        try {
            return await this.animalModel.find(filter).exec();
        } catch (e: unknown) {
            console.error(e);
            return null;
        }
    }
}
