import {Area, AreaType, OpeningHours, Picture} from "../interfaces";

export class AreaClass implements Area {
    public name: string;
    public available: boolean;
    public capacity: number;
    public description: string;
    public disabledAccess: boolean;
    public pictures: Picture[];
    public openingHours : OpeningHours;
    public type: AreaType;

    constructor(name : string, available: boolean, begin?: number, end?: number, capacity?: number, type?: AreaType, description?: string, disabledAccess?: boolean, pictures?: Picture[]) {
        this.name = name;
        this.available = true;
        this.capacity = capacity ?? 500;
        this.description = description ?? "Area description of "+ name;
        this.disabledAccess = disabledAccess ?? true;
        this.openingHours = new OpeningHours(available, begin, end);
        this.type = type ?? AreaType.woodedSpace;
        this.pictures = pictures ?? [];
    }

}