import {Availability, EmployeeType, Staff} from "../interfaces";


export class Employee implements Staff {

    private _name: string;
    private _availability: Availability;
    private _type: EmployeeType;


    constructor(name: string, type: EmployeeType, availability: Availability) {
        this._name = name;
        this._type = type;
        this._availability = availability;
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