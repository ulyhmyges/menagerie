import * as express from "express";
import {Request, Response} from "express";
import {ExpressController} from "./controller.interface";
import {Area, AreaType} from "../models";
import {TicketService} from "../services";
import {AreaService} from "../services";
import {TicketType} from "../models/interfaces/ticket.interface"; // include TicketType from correct module
import {AreaClass} from "../models";

export class AreaController implements ExpressController {
    readonly _path: string;
    readonly _areaService: AreaService;
    readonly _ticketService: TicketService; // new ticket service

    constructor() {
        this._path = '/areas';
        this._areaService = new AreaService();
        this._ticketService = new TicketService(); // initialize the ticket service
    }

    async getAll(req: Request, res: Response){

        const areas = await this._areaService.find({});
        //res.send(staffs);
        res.json(areas);
    }

    async getAreasByName(req: Request, res: Response) {
        const areas = await this._areaService.find({name: req.params.name});
        res.json(areas);
    }

    async getAreaByName(req: Request, res: Response) {
        const area = await this._areaService.findOne({name: req.query.name})
        res.json(area);
    }

    async updateAreaByName(req: Request, res: Response) {
        const update : Area | null = {
            name: req.body.name,
            available: req.body.available,
            description: req.body.description,
            type: req.body.type,
            capacity: req.body.capacity,
            openingHours: req.body.openingHours,
            disabledAccess: req.body.disabledAccess,
            pictures: req.body.pictures
        }
        const area = await this._areaService.update( {name: req.query.name}, update);
        const name = req.body.name ?? req.query.name
        const updateArea = await this._areaService.findOne({name: name});
        res.json(updateArea); // return updated object
    }

    async deleteAreaByName(req: Request, res: Response) {
        const area = await this._areaService.delete({name: req.query.name});
        res.json(area);
    }

    async getAreaById(req: Request, res: Response) {
        const area = await this._areaService.findOne({_id: req.params.id})
        res.json(area);
    }

    async updateAreaById(req: Request, res: Response) {
        const update : Area | null = {
            name: req.body.name,
            available: req.body.available,
            description: req.body.description,
            type: req.body.type,
            capacity: req.body.capacity,
            openingHours: req.body.openingHours,
            disabledAccess: req.body.disabledAccess,
            pictures: req.body.pictures
        }
        const area = await this._areaService.update( {_id: req.params.id}, update);
        const updateArea = await this._areaService.findOne({_id: req.params.id});
        res.json(updateArea);
    }

    async deleteAreaById(req: Request, res: Response) {
        const area = await this._areaService.delete({_id: req.params.id});
        res.json(area);
    }

    async createDefault(req: Request, res: Response): Promise<void> {
        let area: Area | null = new AreaClass("Flamingo pond", true, 9, 20, 2000, AreaType.woodedSpace);
        area = await this._areaService.create(area);
        res.json(area);
    }

    async createArea(req: Request, res: Response): Promise<void> {
        let area: Area | null = new AreaClass(
            req.body.name,
            req.body.available,
            req.body.begin,
            req.body.end,
            req.body.capacity,
            req.body.type,
            req.body.description,
            req.body.disabledAccess,
            req.body.pictures
        )
        area = await this._areaService.create(area);
        res.json(area);
    }

    // ...previous code...

async enterArea(req: Request, res: Response): Promise<void> {
    const {areaId, ticketId} = req.body;

    const area = await this._areaService.findOne({_id: areaId});
    const ticket = await this._ticketService.getTicket(ticketId); // change to getTicket

    if (!area || !ticket) {
        res.status(404).send("Area or Ticket not found");
        return;
    }

    const hasAccess = ticket.type.includes(area.type);

    if (ticket.type === TicketType.EscapeGame) {
        if (ticket.accessOrder && ticket.lastVisitedArea) {
            const previousAreaIndex = ticket.accessOrder.indexOf(ticket.lastVisitedArea);
            const currentAreaIndex = ticket.accessOrder.indexOf(areaId);

            if (previousAreaIndex + 1 !== currentAreaIndex) {
                res.status(403).send("Area access order not respected");
                return;
            }
        } else {
            res.status(403).send("Ticket data for Escape Game is incomplete");
            return;
        }
    }

    if (!hasAccess) {
        res.status(403).send("Area not included in ticket");
        return;
    }

    // update the ticket's last visited area
    this._ticketService.updateTicket(ticketId, {lastVisitedArea: areaId}); // pass ticketId as a string

    res.status(200).send("Access granted");
}

// ...previous code...

    buildRoutes(): express.Router {
        const router = express.Router();
        router.get('/', this.getAll.bind(this));
        router.get('/filter/:name', this.getAreasByName.bind(this));

        router.get('/area', this.getAreaByName.bind(this));
        router.delete('/area', this.deleteAreaByName.bind(this));
        router.put('/area', express.json(), this.updateAreaByName.bind(this));

        router.get('/:id', this.getAreaById.bind(this));
        router.delete('/delete/:id', this.deleteAreaById.bind(this));
        router.put('/update/:id', express.json(), this.updateAreaById.bind(this));

        router.post('/create/default', this.createDefault.bind(this));
        router.post('/create', express.json(), this.createArea.bind(this));

        router.post('/enter', express.json(), this.enterArea.bind(this)); // add this new route

        return router;
    }
}
