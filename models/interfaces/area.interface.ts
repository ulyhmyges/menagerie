import {Picture} from "./picture.interface";
import {Day, Week} from "./staff.interface";

/**
 * les 500 occupants des lieux.
 *
 * Pandas roux, panthères des neiges, oryx d’Arabie, orangs-outans, pythons,
 * tortues des Seychelles, flamants roses, kangourous arboricoles, calao rhinocéros…
 *
 * 146 espèces
 *
 * hébergés dans les "fabriques", petites cabanes en rondins, torchis et toits de chaume,
 * inspirées en 1802, à l’architecte Molinos, par la ferme de Marie-Antoinette à Versailles.
 *
 * Area:
 * espace arboré
 * la Grande volière (1888) Bird
 * le Vivarium (1926), Reptile
 * la Singerie (1936), Primate
 * la Fauverie, BigCat
 */
export interface Area {
    /**
     * (nom, description, images, type, capacité, durée, horaires d’ouverture, accès handicapé)
     */
    _id?: string,
    name: string;
    available: boolean;
    description: string;
    type: AreaType;
    capacity?: number;
    openingHours?: OpeningHours;
    disabledAccess?: boolean;
    pictures?: Picture[];
}

export enum AreaType {
    primates = "Primates",
    bigCatEnclosure = "Big cat enclosure",
    vivarium = "Vivarium",
    aviary = "Aviary",
    woodedSpace = "Wooded space"
}

export class OpeningHours implements Week {
    monday: Day;
    tuesday: Day;
    wednesday: Day;
    thursday: Day;
    friday: Day;
    saturday: Day;
    sunday: Day;

    constructor(available: boolean, begin?: number, end?: number) {
        const start = begin ?? 10;
        const stop = end ?? 18;
        this.monday = {available: available, time: {begin: start, end: stop}}
        this.tuesday = {available: available, time: {begin: start, end: stop}}
        this.wednesday = {available: available, time: {begin: start, end: stop}}
        this.thursday = {available: available, time: {begin: start, end: stop}}
        this.friday = {available: available, time: {begin: start, end: stop}}
        this.saturday = {available: available, time: {begin: start, end: stop}}
        this.sunday = {available: false, time: undefined}
    }
}
