import {ExpressController} from "./controller.interface";
import {Request, Response} from "express";
import * as express from "express";
import {AnimalService} from "../services";
import {Animal, Gender} from "../models";
import {AnimalClass} from "../models";

export class AnimalController implements ExpressController {
    readonly _path: string;
    readonly _animalService: AnimalService;

    constructor() {
        this._path = '/animals';
        this._animalService = new AnimalService();
    }

    async getAll(req: Request, res: Response) {
        const animals = await this._animalService.find({});
        res.json(animals);
    }

    async getAnimalsByName(req: Request, res: Response) {
        const animals = await this._animalService.find({name: req.params.name});
        res.json(animals);
    }

    async getAnimalByName(req: Request, res: Response) {
        const animals = await this._animalService.findOne({name: req.query.name});
        res.json(animals);
    }

    async updateAnimalByName(req: Request, res: Response) {
        const update: Animal | null = {
            name: req.body.name,
            birth: req.body.birth,
            gender: req.body.gender,
            area: req.body.area,
            scientificName: req.body.scientificName,
            carebook: req.body.carebook
        }
        const animal = await this._animalService.update({name: req.query.name}, update);
        const name = req.body.name ?? req.query.name
        const updateAnimal = await this._animalService.findOne({name: name});
        res.json(updateAnimal); // return updated object
    }

    async deleteAnimalByName(req: Request, res: Response) {
        const animal = await this._animalService.delete({name: req.query.name});
        res.json(animal);
    }

    async getAnimalById(req: Request, res: Response) {
        const animal = await this._animalService.findOne({_id: req.params.id})
        res.json(animal);
    }

    async updateAnimalById(req: Request, res: Response) {
        const update: Animal | null = {
            name: req.body.name,
            birth: req.body.birth,
            gender: req.body.gender,
            area: req.body.area,
            scientificName: req.body.scientificName,
            carebook: req.body.carebook
        }
        const animal = await this._animalService.update({_id: req.params.id}, update);
        const updateAnimal = await this._animalService.findOne({_id: req.params.id});
        res.json(updateAnimal);
    }

    async deleteAnimalById(req: Request, res: Response) {
        const animal = await this._animalService.delete({_id: req.params.id});
        res.json(animal);
    }


    async createDefault(req: Request, res: Response): Promise<void> {

        let animal: Animal | null = new AnimalClass("Simba", "1997-05-15", Gender.male);
        animal = await this._animalService.create(animal);
        res.json(animal);
    }

    async create(req: Request, res: Response): Promise<void> {
        let animal: Animal | null = new AnimalClass(
            req.body.name,
            req.body.birth,
            req.body.gender,
            req.body.area,
            req.body.scientificName,
            req.body.carebook
        )
        animal = await this._animalService.create(animal);
        res.json(animal);
    }

    buildRoutes(): express.Router {
        const router = express.Router();
        router.get('/', this.getAll.bind(this));
        router.get('/filter/:name', this.getAnimalsByName.bind(this));

        router.get('/animal', this.getAnimalByName.bind(this));
        router.delete('/animal', this.deleteAnimalByName.bind(this));
        router.put('/animal', express.json(), this.updateAnimalByName.bind(this));

        router.get('/:id', this.getAnimalById.bind(this));
        router.delete('/delete/:id', this.deleteAnimalById.bind(this));
        router.put('/update/:id', express.json(), this.updateAnimalById.bind(this));

        router.post('/create/default', this.createDefault.bind(this));
        router.post('/create', express.json(), this.create.bind(this));
        return router;
    }
}