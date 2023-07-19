import {config} from "dotenv";
import * as cors from "cors";

config({
    path: ".env.prod"
});

import * as express from 'express';
import {AnimalController, AreaController, ExpressController, StaffController} from "./controller";
import {connect} from "mongoose";
import {UserController} from "./controller/user.controller";



async function launchAPI(): Promise<void> {
    await connect(process.env.MONGO_URI as string, {
        auth: {
            username: process.env.MONGO_USER,
            password: process.env.MONGO_PASSWORD,
        },
        authSource: "admin",
    });

    const app = express();
    app.use(cors({
        origin: "*"
    }));

    const controllers: ExpressController[] = [
        new StaffController(),
        new AreaController(),
        new AnimalController(),
        new UserController(),
    ]

    // Permet d'enregistrer dans express toutes les routes
    // pour chaque controller du tableau
    for (let controller of controllers) {
        const router = controller.buildRoutes();
        app.use(controller._path, router);
    }

    app.listen(process.env.PORT, function() {
        console.log(`API Listening on port ${process.env.PORT}...`);
    });

}

launchAPI().catch(console.error);


