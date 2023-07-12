export class Picture {
    private _title: string;
    private _name: string;
    private _src: string;
    private _description: string;

    constructor(name: string, title: string, src: string, description: string) {
        this._name = name;
        this._title = title;
        this._src = src;
        this._description = description;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get src(): string {
        return this._src;
    }

    set src(value: string) {
        this._src = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }
}