import {CareBook} from "./carebook.interface";
import {Area} from "./area.interface";

export interface Animal {
    _id?: string;
    name: string;
    scientificName?: string | null;
    birth: Date;
    gender: Gender;
    carebook: CareBook | null;
    area: Area | null;
}

export enum Gender {
    female = "Female",
    male = "Male"
}

