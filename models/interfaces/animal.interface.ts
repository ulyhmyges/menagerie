export interface Animal {
    name: string;
    scientificName: string;
    id: number;
    male: boolean;
    healthy: boolean;
    dead: boolean;
    age: number;
    entry: Date;
    exit?: Date;

}