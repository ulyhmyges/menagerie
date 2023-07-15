import { TicketType } from "../ticket.interface";

export interface Ticket {
    _id: string;
    type: TicketType;
    allowedAreas: string[];
    // ... Ajouter les autres propriétés nécessaires ici ...
}
