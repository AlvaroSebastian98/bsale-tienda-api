import { Application } from 'express';
import { createContainer, asClass } from 'awilix';
import { scopePerRequest } from 'awilix-express';

import { CategoryMySQLRepository } from './services/repositories/mysql/category.repository';
import { ProductMySQLRepository } from './services/repositories/mysql/product.repository';

import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';

export default (app: Application): void => {
    const container = createContainer({
        injectionMode: "CLASSIC"
    });

    container.register({
        // repositories
        categoryRepository: asClass(CategoryMySQLRepository).scoped(),
        productRepository: asClass(ProductMySQLRepository).scoped(),

        // services
        categoryService: asClass(CategoryService).scoped(),
        productService: asClass(ProductService).scoped()
    });

    app.use(scopePerRequest(container));
}