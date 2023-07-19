import {Veterinary} from "./veterinary.class";
import {CareBook, Treatment, Wellbeing} from "../carebook.model";
import {Animal} from "../animal.model";

export class CarebookClass implements CareBook {
    public owner: Animal;
    public start: Date;
    public health: Wellbeing;
    public appointment: Date;
    public treatments: Treatment[];

    constructor(owner: Animal, start: Date, health: Wellbeing, appointment: Date, treatments: Treatment[]) {
        this.owner = owner;
        this.start = start;
        this.health = health;
        this.appointment = appointment;
        this.treatments = treatments;
    }
}

export class TreatmentClass implements Treatment {
    public animal: Animal;
    public date: Date;
    public description: string;
    public place: string;
    public veterinary: Veterinary | null;

    constructor(animal: Animal, date: Date, place: string, description: string) {
        this.animal = animal;
        this.date = date;
        this.place = place;
        this.description = description;
        this.veterinary = null;
    }
}