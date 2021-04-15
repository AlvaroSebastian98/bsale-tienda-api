import { ApplicationException } from '../common/exceptions/application.exception';

import { CategoryRepository } from './repositories/category.repository';
import { ProductRepository } from './repositories/product.repository';

import { Product } from './repositories/domain/product';


export class ProductService {

    constructor(
        private readonly categoryRepository: CategoryRepository,
        private readonly productRepository: ProductRepository
    ) {}

    public async getAll(): Promise<Product[]> {
        return await this.productRepository.getAll();
    }

    public async getByCategory(categoryId: number): Promise<Product[] | null> {
        const category = await this.categoryRepository.findById(categoryId);
        if(!category) throw new ApplicationException('Non-existent category');

        return await this.productRepository.getByCategory(categoryId);
    }

    public async findByName(name: string): Promise<Product[] | null> {
        return await this.productRepository.findByName(name);
    }

}