import {Model} from "mongoose";
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
            return await this.staffModel.find(filter).exec();
        } catch (e: unknown) {
            console.log(e + "error find")
            return null;
        }
    }

}
