import * as express from "express";
import {Request, Response} from "express";
import {ExpressController} from "./controller.interface";
import {StaffService} from "../services";
import {Day, EmployeeType, Staff, Week, YearFull} from "../models";


export class StaffController implements ExpressController {
    readonly _path: string;
    readonly _staffService: StaffService;

    constructor() {
        this._path = '/staffs';
        this._staffService = new StaffService();
    }

    async getAll(req: Request, res: Response){
        const staffs = await this._staffService.findStaffs({});
        //res.send(staffs);
        res.json(staffs);
    }

    async getStaffsByName(req: Request, res: Response) {
        const staffs = await this._staffService.findStaffs({name: req.params.name});
        res.json(staffs);
    }

    async getStaffByName(req: Request, res: Response) {
        const staff = await this._staffService.findStaff({name: req.params.name})
        res.json(staff);
    }
    async updateStaffByName(req: Request, res: Response) {
        const update : Staff | null = {name: req.body.name, type: req.body.type, availability: req.body.availability}
        const staff = await this._staffService.updateStaff( {name: req.params.name}, update);
        const updateStaff = await this._staffService.findStaff({name: req.body.name});
        res.json(updateStaff);
    }

    async deleteStaffByName(req: Request, res: Response) {
        const staff = await this._staffService.deleteStaff({name: req.params.name});
        res.json(staff);
    }

    async getStaffById(req: Request, res: Response) {
        const staff = await this._staffService.findStaff({_id: req.params.id})
        res.json(staff);
    }

    async updateStaffById(req: Request, res: Response) {
        const update : Staff | null = {name: req.body.name, type: req.body.type, availability: req.body.availability}
        const staff = await this._staffService.updateStaff( {_id: req.params.id}, update);
        const updateStaff = await this._staffService.findStaff({_id: req.params.id});
        res.json(updateStaff);
    }

    async deleteStaffById(req: Request, res: Response) {
        const staff = await this._staffService.deleteStaff({_id: req.params.id});
        res.json(staff);
    }


    async createDefault(req: Request, res: Response): Promise<void> {
        const day : Day = {available: true, time: {begin: 7, end: 14}};
        const week1: Week = {available: true, index: 1, monday: day, tuesday: day, wednesday: day, thursday: day, friday: day}
        let staff: Staff | null = {name: "toto", type: EmployeeType.salesman, availability: {available: true, weeks: [week1]}}
        staff = await this._staffService.createStaff(staff);
        res.json(staff);
    }

    async create(req: Request, res: Response): Promise<void> {
        const begin = req.body.begin;
        const end = req.body.end;
        let availability = req.body.availability;

        if (!availability && begin && end) {
            availability = new YearFull(begin, end);
        }
        let staff : Staff | null = {
            name: req.body.name,
            type: req.body.type,
            availability: availability
        }
        staff = await this._staffService.createStaff(staff);
        res.json(staff);
    }

    buildRoutes(): express.Router {
        const router = express.Router();
        router.get('/', this.getAll.bind(this));
        router.get('/:name', this.getStaffsByName.bind(this));

        router.get('/staff/:name', this.getStaffByName.bind(this));
        router.delete('/staff/delete/:name', this.deleteStaffByName.bind(this));
        router.put('/staff/update/:name', express.json(), this.updateStaffByName.bind(this));

        router.get('/staff/:id', this.getStaffById.bind(this));
        router.delete('/staff/delete/:id', this.deleteStaffById.bind(this));
        router.put('/staff/update/:id', express.json(), this.updateStaffById.bind(this));

        router.post('/create', express.json(), this.create.bind(this));
        router.post('/create/default', this.createDefault.bind(this));
        return router;
    }


}