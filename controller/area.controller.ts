import * as express from "express";
import {Request, Response} from "express";
import {ExpressController} from "./controller.interface";
import {AreaService} from "../services/area.service";
import {Area, AreaType} from "../models";
import {AreaClass} from "../models/classes/area.class";


export class AreaController implements ExpressController {
    readonly _path: string;
    readonly _areaService: AreaService;

    constructor() {
        this._path = '/areas';
        this._areaService = new AreaService();
    }

    async getAll(req: Request, res: Response){
        const areas = await this._areaService.findAreas({});
        //res.send(staffs);
        res.json(areas);
    }

    async getAreasByName(req: Request, res: Response) {
        const areas = await this._areaService.findAreas({name: req.params.value});
        res.json(areas);
    }

    async getAreaByName(req: Request, res: Response) {
        const area = await this._areaService.findArea({name: req.params.value})
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
        const area = await this._areaService.updateArea( {name: req.params.value}, update);
        const updateArea = await this._areaService.findArea({name: req.body.name});
        res.json(updateArea); // return updated object
    }

    async deleteAreaByName(req: Request, res: Response) {
        const area = await this._areaService.deleteArea({name: req.params.value});
        res.json(area);
    }

    async getAreaById(req: Request, res: Response) {
        const area = await this._areaService.findArea({_id: req.params.value})
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
        const area = await this._areaService.updateArea( {_id: req.params.value}, update);
        const updateArea = await this._areaService.findArea({_id: req.params.value});
        res.json(updateArea);
    }

    async deleteAreaById(req: Request, res: Response) {
        const area = await this._areaService.deleteArea({_id: req.params.value});
        res.json(area);
    }


    async createDefault(req: Request, res: Response): Promise<void> {

        let area: Area | null = new AreaClass("Flamingo pond", true, 9, 20, 2000, AreaType.woodedSpace);
        area = await this._areaService.createArea(area);
        res.json(area);
    }

    async create(req: Request, res: Response): Promise<void> {
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
        area = await this._areaService.createArea(area);
        res.json(area);
    }

    buildRoutes(): express.Router {
        const router = express.Router();
        router.get('/', this.getAll.bind(this));
        router.get('/:value', this.getAreasByName.bind(this));

        router.get('/name/:value', this.getAreaByName.bind(this));
        router.delete('/name/:value/delete', this.deleteAreaByName.bind(this));
        router.put('/name/:value/update', express.json(), this.updateAreaByName.bind(this));

        router.get('/id/:value', this.getAreaById.bind(this));
        router.delete('/id/:value/delete', this.deleteAreaById.bind(this));
        router.put('/id/:value/update', express.json(), this.updateAreaById.bind(this));

        router.post('/create/default', this.createDefault.bind(this));
        router.post('/create', express.json(), this.create.bind(this));

        return router;
    }


}