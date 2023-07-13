import {CareBook} from "./carebook.interface";
import {Area} from "./area.interface";

export interface Animal {
    _id: string;
    name: string;
    scientificName?: string;
    birth: Date;
    gender: boolean;
    carebook: CareBook;
    area: Area;
}

