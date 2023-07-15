import {Router, Request, Response} from "express";
import {TicketService} from "../services/ticket.service";
import {Ticket} from "../models/interfaces/ticket.interface";
import express = require("express");

export class TicketController {
    readonly _path: string = "/tickets";
    readonly ticketService: TicketService;

    constructor() {
        this._path = '/tickets';
        this.ticketService = new TicketService();
    }

    createTicket(req: Request, res: Response): void {
        const ticket: Ticket = req.body;

        this.ticketService.createTicket(ticket)
            .then(ticket => res.json(ticket))
            .catch(err => res.status(500).send(err));
        
        
    }

    getTicket(req: Request, res: Response): void {
        const ticketId = req.params.id;

        this.ticketService.getTicket(ticketId)
            .then(ticket => res.json(ticket))
            .catch(err => res.status(500).send(err));
    }

    updateTicket(req: Request, res: Response): void {
        const ticketId = req.params.id;
        const ticketUpdate: Ticket = req.body;

        this.ticketService.updateTicket(ticketId, ticketUpdate)
            .then(ticket => res.json(ticket))
            .catch(err => res.status(500).send(err));
    }

    deleteTicket(req: Request, res: Response): void {
        const ticketId = req.params.id;

        this.ticketService.deleteTicket(ticketId)
            .then(() => res.status(204).send())
            .catch(err => res.status(500).send(err));
    }

    buildRoutes(): Router {
        const router = Router();

        router.post('/', express.json(), this.createTicket.bind(this));
        router.get('/:id', express.json(),this.getTicket.bind(this));
        router.put('/:id', express.json(),this.updateTicket.bind(this));
        router.delete('/:id', express.json(),this.deleteTicket.bind(this));

        return router;
    }
}
