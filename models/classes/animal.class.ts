import {Animal, Gender} from "../animal.model";
import {Area, AreaType} from "../area.model";
import {Carebook} from "../carebook.model";

export class AnimalClass implements Animal {
    public name: string;
    public scientificName: string | null;
    public birth: string;
    public gender: Gender;
    public carebook: string | Carebook;
    public area: string | Area;

    constructor(name: string, birth: string, gender: Gender, area?: string | Area, scientificName?: string, carebook?: string | Carebook) {
        this.name = name;
        this.scientificName = scientificName ?? null;
        this.birth = birth;
        this.gender = gender;
        this.carebook = carebook ?? "None";
        this.area = area ?? AreaType.woodedSpace;
    }
}
