export enum TicketType {
    Day = 'day',
    Weekend = 'weekend',
    Annual = 'annual',
    OneDayPerMonth = 'oneDayPerMonth',
    EscapeGame = 'escapeGame'
}

export interface Ticket {
    _id: string;
    date_start:Date;
    date_end:Date;
    price:number;
    type: TicketType; 
    allowedAreas: string[]; 
    sequence?: string[]; 
    accessOrder?: string[]; // New: ordered list of areas' IDs for "escapeGame" type
    lastVisitedArea?: string; // New: ID of the last visited area for "escapeGame" type
}
