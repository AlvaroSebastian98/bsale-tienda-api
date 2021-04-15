import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { loadControllers } from 'awilix-express';
import loadContainer from './container';

export default class App {

    public app: express.Application;
    private extension: string;

    constructor() {
        this.app = express();
        this.extension = process.env.NODE_ENV === 'production' ? 'js' : 'ts';

        this.execute();
    }

    private middlewares() {
        // Body parser
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        // CORS
        this.app.use(cors());

        // Container
        loadContainer(this.app);

        // Controllers
        this.app.use(loadControllers(
            `controllers/*.${this.extension}`, {
            cwd: __dirname
        }));

    }

    public execute() {
        // Initialize Middlewares
        this.middlewares()
    }

}