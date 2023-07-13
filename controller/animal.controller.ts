import {ExpressController} from "./controller.interface";
import {Request, Response} from "express";
import * as express from "express";
import {AnimalService} from "../services";
import {Animal, Area, CareBook, Gender} from "../models";
import {AnimalClass} from "../models";

export class AnimalController implements ExpressController {
    readonly _path: string;
    readonly _animalService: AnimalService;

    constructor() {
        this._path = '/animals';
        this._animalService = new AnimalService();
    }

    async getAll(req: Request, res: Response) {
        const animals = await this._animalService.findAnimals({});
        res.json(animals);
    }

    async getAnimalsByName(req: Request, res: Response) {
        const animals = await this._animalService.findAnimals({name: req.params.value});
        res.json(animals);
    }

    async getAnimalByName(req: Request, res: Response) {
        const animals = await this._animalService.findAnimal({name: req.params.value});
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
        const animal = await this._animalService.updateAnimal({name: req.params.value}, update);
        const updateAnimal = await this._animalService.findAnimal({name: req.body.name});
        res.json(updateAnimal); // return updated object
    }

    async deleteAnimalByName(req: Request, res: Response) {
        const animal = await this._animalService.deleteAnimal({name: req.params.value});
        res.json(animal);
    }

    async getAnimalById(req: Request, res: Response) {
        const animal = await this._animalService.findAnimal({_id: req.params.value})
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
        const animal = await this._animalService.updateAnimal({_id: req.params.value}, update);
        const updateAnimal = await this._animalService.findAnimal({_id: req.params.value});
        res.json(updateAnimal);
    }

    async deleteAnimalById(req: Request, res: Response) {
        const animal = await this._animalService.deleteAnimal({_id: req.params.value});
        res.json(animal);
    }


    async createDefault(req: Request, res: Response): Promise<void> {

        let animal: Animal | null = new AnimalClass("Simba", new Date(1998, 5, 13), Gender.male);
        animal = await this._animalService.createAnimal(animal);
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
        animal = await this._animalService.createAnimal(animal);
        res.json(animal);
    }

    buildRoutes(): express.Router {
        const router = express.Router();
        router.get('/', this.getAll.bind(this));
        router.get('/:value', this.getAnimalsByName.bind(this));

        router.get('/name/:value', this.getAnimalByName.bind(this));
        router.delete('/name/:value/delete', this.deleteAnimalByName.bind(this));
        router.put('/name/:value/update', express.json(), this.updateAnimalByName.bind(this));

        router.get('/id/:value', this.getAnimalById.bind(this));
        router.delete('/id/:value/delete', this.deleteAnimalById.bind(this));
        router.put('/id/:value/update', express.json(), this.updateAnimalById.bind(this));

        router.post('/create/default', this.createDefault.bind(this));
        router.post('/create', express.json(), this.create.bind(this));
        return router;
    }
}