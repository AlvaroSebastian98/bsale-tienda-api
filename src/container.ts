import { Application } from 'express';
import { createContainer, asClass } from 'awilix';
import { scopePerRequest } from 'awilix-express';

export default (app: Application) => {
    const container = createContainer({
        injectionMode: "CLASSIC"
    });

    container.register({});

    app.use(scopePerRequest(container));
}