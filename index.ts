import {config} from "dotenv";
import * as cors from "cors";

config({
    path: ".env.prod"
});

import * as express from 'express';
import mongoose, {connect, Schema} from 'mongoose';
import {AnimalController, AreaController, ExpressController, StaffController} from "./controller";



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
    ]
    for (let controller of controllers) {
        const router = controller.buildRoutes();
        app.use(controller._path, router);
    }
    // const controllers: ExpressController[] = [
    //     new CocktailController(),
    //     //new UserController()
    // ];
    // // Permet d'enregistrer dans express toutes les routes des controllers du
    // // tableau ci-dessus
    // for(let controller of controllers) {
    //     const router = controller.buildRoutes();
    //     app.use(controller.path, router);
    // }
    app.listen(process.env.PORT, function() {
        console.log(`API Listening on port ${process.env.PORT}...`);
    });

}

launchAPI().catch(console.error);


