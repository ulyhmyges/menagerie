import {Availability, EmployeeType, Staff, Week} from "../interfaces";
import {WeekClass, YearFull} from "./availability.class";


export class Veterinary implements Staff {

    private _name: string;
    private _availability: Availability;
    private _type: EmployeeType;


    constructor(name: string, beginHour: number, endHour: number) {
        this._name = name;
        this._type = EmployeeType.veterinary;
        this._availability = new YearFull(beginHour, endHour);
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get availability(): Availability {
        return this._availability;
    }

    set availability(value: Availability) {
        this._availability = value;
    }

    get type(): EmployeeType {
        return this._type;
    }

    set type(value: EmployeeType) {
        this._type = value;
    }
}