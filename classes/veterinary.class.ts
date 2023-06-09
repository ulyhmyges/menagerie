import {Staff} from "../interfaces/staff.interface";

export class Veterinary implements Staff {

    private _name: string;

    constructor(name: string) {
        this._name = name;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }


}