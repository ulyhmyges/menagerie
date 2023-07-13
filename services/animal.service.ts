import {Model} from "mongoose";
import {Animal, AnimalModel} from "../models";
export class AnimalService {
    readonly animalModel: Model<Animal>;

    constructor() {
        this.animalModel = AnimalModel;
    }

    async createAnimal(animal: Animal): Promise<Animal | null> {
        try {
            return await this.animalModel.create({
                name: animal.name,
                scientificName: animal.scientificName,
                birth: animal.birth,
                gender: animal.gender,
                carebook: animal.carebook,
                area: animal.area
            })
        } catch (e: unknown) {
            console.log(e)
            return null;
        }
    }

    async updateAnimal(filter: object, update: object): Promise<Animal | null> {
        try {
            return await this.animalModel.findOneAndUpdate(filter, update);
        } catch (e: unknown) {
            console.log(e + "error updataOne")
            return null;
        }
    }

    async deleteAnimal(conditions: object): Promise<Animal | null> {
        try {
            return await this.animalModel.findOneAndDelete(conditions);
        } catch (e: unknown) {
            console.log(e + "error deleteOne")
            return null;
        }
    }

    async findAnimal(filter: object): Promise<Animal | null> {
        try {
            console.log(filter)
            return await this.animalModel.findOne(filter);
        } catch (e: unknown) {
            console.log(e + "error findOne");
            return null;
        }
    }

    async findAnimals(filter: object): Promise<Animal[] | null>{
        try {
            return await this.animalModel.find(filter).exec();
        } catch (e: unknown) {
            console.log(e + "error find")
            return null;
        }
    }
}
