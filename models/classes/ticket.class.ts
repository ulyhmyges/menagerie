import {Ticket, TicketType} from "../interfaces/ticket.interface";

export class TicketClass implements Ticket {
    public _id: string;
    public type: TicketType;
    public allowedAreas: string[];
    public sequence?: string[];
    public accessOrder?: string[];
    public lastVisitedArea?: string;
    public date_start: Date;
    public date_end: Date;
    public price: number;

    constructor(
        _id: string,
        type: TicketType,
        allowedAreas: string[],
        date_start: Date,
        date_end: Date,
        price: number,
        sequence?: string[],
        accessOrder?: string[],
        lastVisitedArea?: string,
    ) {
        this._id = _id;
        this.type = type;
        this.allowedAreas = allowedAreas;
        this.sequence = sequence;
        this.accessOrder = accessOrder;
        this.lastVisitedArea = lastVisitedArea;
        this.date_start = date_start;
        this.date_end = date_end;
        this.price = price;
    }
  
}
