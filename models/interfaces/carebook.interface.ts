import {Animal} from "./animal.interface";
import {Veterinary} from "../classes";

export enum Wellbeing {
    healthy = "Healthy",
    unwell = "Unwell",
    week = "Week",
    diseased = "Diseased",
    dead = "Dead"
}
export interface CareBook {
    _id: string;
    owner: Animal;
    start: Date;
    end: Date;
    place: string;
    health: Wellbeing;
    appointment: Date;
    treatments: Treatment[]
}

export interface Treatment {
    _id: string;
    animal: Animal;
    date: Date;
    place: string;
    description: string;
    veterinary: Veterinary;
}