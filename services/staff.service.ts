import {HydratedDocument, isValidObjectId, Model} from "mongoose";
import {Staff, StaffModel} from "../models";
export class StaffService {
    readonly staffModel: Model<Staff>;

    constructor() {
        this.staffModel = StaffModel;
    }

    async createStaff(staff: Staff): Promise<Staff | null> {
        try {
            return await this.staffModel.create({
                name: staff.name,
                type: staff.type,
                availability: staff.availability
            });
        } catch (e: unknown) {
            console.log(e)
            return null;
        }
    }

    async updateStaff(filter: object, update: object): Promise<Staff | null> {
        try {
            return await this.staffModel.findOneAndUpdate(filter, update);
        } catch (e: unknown) {
            console.log(e + "error updataOne")
            return null;
        }
    }

    async deleteStaff(conditions: object): Promise<Staff | null> {
        try {
            return await this.staffModel.findOneAndDelete(conditions);
        } catch (e: unknown) {
            console.log(e + "error deleteOne")
            return null;
        }
    }

    async findStaff(filter: object): Promise<Staff | null> {
        try {
            console.log(filter)
            return await this.staffModel.findOne(filter);
        } catch (e: unknown) {
            console.log(e + "error findOne");
            return null;
        }
    }

    async findStaffs(filter: object): Promise<Staff[] | null>{
        try {
            console.log("there findstaffs..")
            return await this.staffModel.find(filter).exec();
        } catch (e: unknown) {
            console.log(e + "error find")
            return null;
        }
    }

}
// export class CocktailService {
//
//
//
//
//     async findCocktail(cocktail: Cocktail): Promise<Cocktail | null> {
//         return await this.cocktailModel.findOne({
//             name: cocktail.name
//         }).exec();
//     }
//
//     async findCocktailsByName(cocktail: Cocktail): Promise<Array<HydratedDocument<Cocktail, {}, {}>>> {
//         return await this.cocktailModel.find( {
//             name: cocktail.name
//         }).exec();
//     }
//
//     async updateCocktail(name: string, cocktail: Cocktail): Promise<void> {
//         await this.cocktailModel.findOneAndUpdate({name: name}, {
//             name: cocktail.name,
//             price: cocktail.price,
//             alcohol: cocktail.alcohol,
//             ingredients: cocktail.ingredients,
//             description: cocktail.description
//         });
//     }
//
//     async deleteCocktail(cocktail: Cocktail): Promise<void> {
//         await this.cocktailModel.findOneAndUpdate({name: cocktail.name});
//     }
//
// }