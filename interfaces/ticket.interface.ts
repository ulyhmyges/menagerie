export interface Ticket {
    name: string;
    ref: number;
    validate: boolean;

    duration() : number; // jours?
}