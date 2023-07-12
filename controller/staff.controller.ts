import * as express from "express";
import {Request, Response} from "express";
import {ExpressController} from "./controller.interface";
import {StaffService} from "../services";
import {Day, EmployeeType, Staff, Week} from "../models";


export class StaffController implements ExpressController {
    readonly _path: string;
    readonly _staffService: StaffService;

    constructor() {
        this._path = '/staff';
        this._staffService = new StaffService();
    }

    async getAll(req: Request, res: Response){
        const staffs = await this._staffService.findStaffs({});
        //res.send(staffs);
        res.json(staffs);
    }

    async getStaffsByName(req: Request, res: Response) {
        const staffs = await this._staffService.findStaffs({name: req.params.value});
        res.json(staffs);
    }

    async getStaffByName(req: Request, res: Response) {
        const staff = await this._staffService.findStaff({name: req.params.value})
        res.json(staff);
    }
    async updateStaffByName(req: Request, res: Response) {
        const update : Staff | null = {name: req.body.name, type: req.body.type, availability: req.body.availability}
        console.log(req.body);
        const staff = await this._staffService.updateStaff( {name: req.params.value}, update);
        const updateStaff = await this._staffService.findStaff({name: req.body.name});
        res.json(updateStaff);
    }

    async deleteStaffByName(req: Request, res: Response) {
        const staff = await this._staffService.deleteStaff({name: req.params.value});
        res.json(staff);
    }

    async getStaffById(req: Request, res: Response) {
        const staff = await this._staffService.findStaff({_id: req.params.value})
        res.json(staff);
    }

    async updateStaffById(req: Request, res: Response) {
        const update : Staff | null = {name: req.body.name}
        console.log(req.body);
        const staff = await this._staffService.updateStaff( {_id: req.params.value}, update);
        const updateStaff = await this._staffService.findStaff({_id: req.params.value});
        res.json(updateStaff);
    }

    async deleteStaffById(req: Request, res: Response) {
        const staff = await this._staffService.deleteStaff({_id: req.params.value});
        res.json(staff);
    }


    async create(req: Request, res: Response): Promise<void> {
        const day : Day = {available: true, time: {begin: 7, end: 14}};
        const week1: Week = {available: true, index: 1, monday: day, tuesday: day, wednesday: day, thursday: day, friday: day}
        let staff: Staff | null = {name: "toto", type: EmployeeType.salesman, availability: {available: true, weeks: [week1]}}
        staff = await this._staffService.createStaff(staff);
        res.json(staff);
    }

    buildRoutes(): express.Router {
        const router = express.Router();
        router.get('/', this.getAll.bind(this));
        router.get('/:value', this.getStaffsByName.bind(this));

        router.get('/name/:value', this.getStaffByName.bind(this));
        router.delete('/name/:value/delete', this.deleteStaffByName.bind(this));
        router.put('/name/:value/update', express.json(), this.updateStaffByName.bind(this));

        router.get('/id/:value', this.getStaffById.bind(this));
        router.delete('/id/:value/delete', this.deleteStaffById.bind(this));
        router.put('/id/:value/update', express.json(), this.updateStaffById.bind(this));

        router.post('/create', this.create.bind(this));
        return router;
    }


}