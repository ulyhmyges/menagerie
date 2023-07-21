import {Model} from "mongoose";
import {TicketModel} from "../models/ticket.model";
import {Ticket} from "../models/interfaces/ticket.interface";

export class TicketService {
    readonly ticketModel: Model<Ticket>;

    constructor() {
        this.ticketModel = TicketModel;
    }

    async createTicket(ticket: Ticket): Promise<Ticket | null> {
        try {
            return await this.ticketModel.create({
                type: ticket.type,
                allowedAreas: ticket.allowedAreas,
                sequence: ticket.sequence,
            });
        } catch (e: unknown) {
            console.log(e);
            return null;
        }
    }

    async getTicket(ticketId: string): Promise<Ticket | null> {
        return this.findTicket({_id: ticketId});
    }

    async updateTicket(ticketId: string, update: object): Promise<Ticket | null> {
        try {
            return await this.ticketModel.findOneAndUpdate({_id: ticketId}, update, {new: true});
        } catch (e: unknown) {
            console.log(e + " error updateOne")
            return null;
        }
    }

    async deleteTicket(ticketId: string): Promise<Ticket | null> {
        try {
            return await this.ticketModel.findOneAndDelete({_id: ticketId});
        } catch (e: unknown) {
            console.log(e + " error deleteOne")
            return null;
        }
    }

    private async findTicket(filter: object): Promise<Ticket | null> {
        try {
            console.log(filter);
            return await this.ticketModel.findOne(filter);
        } catch (e: unknown) {
            console.log(e + " error findOne");
            return null;
        }
    }

    async findTickets(filter: object): Promise<Ticket[] | null> {
        try {
            return await this.ticketModel.find(filter).exec();
        } catch (e: unknown) {
            console.log(e + " error find")
            return null;
        }
    }
}
