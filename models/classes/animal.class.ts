import {Animal, Gender} from "../animal.model";
import {CareBook} from "../carebook.model";
import {Area} from "../area.model";

export class AnimalClass implements Animal {
    public name: string;
    public scientificName: string | null;
    public birth: Date;
    public gender: Gender;
    public carebook: CareBook | null;
    public area: Area | null;

    constructor(name: string, birth: Date, gender: Gender, area?: Area, scientificName?: string, carebook?: CareBook) {
        this.name = name;
        this.scientificName = scientificName ?? null;
        this.birth = birth;
        this.gender = gender;
        this.carebook = carebook ?? null;
        this.area = area ?? null;
    }
}
