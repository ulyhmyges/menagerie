import {Veterinary} from "./veterinary.class";
import {Animal} from "../animal.model";
import {Carebook, Wellbeing} from "../carebook.model";
import {Treatment} from "../treatment.model";

export class CarebookClass implements Carebook {
    public owner: Animal;
    public start: string;
    public health: Wellbeing;
    public treatments: Treatment[];

    constructor(owner: Animal, start: string, health: Wellbeing, treatments: Treatment[]) {
        this.owner = owner;
        this.start = start;
        this.health = health;
        this.treatments = treatments;
    }
}

export class TreatmentClass implements Treatment {
    public animal: Animal;
    public date: string;
    public description: string;
    public place: string;
    public veterinary: string | Veterinary;

    constructor(animal: Animal, date: string, place: string, description: string) {
        this.animal = animal;
        this.date = date;
        this.place = place;
        this.description = description;
        this.veterinary = "None";
    }
}