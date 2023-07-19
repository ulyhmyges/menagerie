import * as express from "express";
import {Request, Response} from "express";
import {ExpressController} from "./controller.interface";
import {AreaService} from "../services";
import {Area, AreaType} from "../models";
import {AreaClass} from "../models";


export class AreaController implements ExpressController {
    readonly _path: string;
    readonly _areaService: AreaService;

    constructor() {
        this._path = '/areas';
        this._areaService = new AreaService();
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
        const updateArea = await this._areaService.find({name: req.body.name});
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

    buildRoutes(): express.Router {
        const router = express.Router();
        router.get('/', this.getAll.bind(this));
        router.get('/:name', this.getAreasByName.bind(this));

        router.get('/area', this.getAreaByName.bind(this));
        router.delete('/area/delete', this.deleteAreaByName.bind(this));
        router.put('/area/update', express.json(), this.updateAreaByName.bind(this));

        router.get('/area/:id', this.getAreaById.bind(this));
        router.delete('/area/delete/:id', this.deleteAreaById.bind(this));
        router.put('/area/update/:id', express.json(), this.updateAreaById.bind(this));

        router.post('/create/default', this.createDefault.bind(this));
        router.post('/create', express.json(), this.createArea.bind(this));

        return router;
    }


}