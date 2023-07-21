import mongoose, {Model, Schema} from "mongoose";
import {Ticket, TicketType} from "./interfaces/ticket.interface";

const ticketSchema = new Schema<Ticket>({
    type: { type: Schema.Types.String, enum: Object.values(TicketType) },
    allowedAreas: [Schema.Types.String],
    sequence: [Schema.Types.String],
    accessOrder: [Schema.Types.String], // New
    lastVisitedArea: Schema.Types.String, // New
});

export const TicketModel: Model<Ticket> = mongoose.model('Ticket', ticketSchema);
