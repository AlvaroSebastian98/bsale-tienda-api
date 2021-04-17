import { ApplicationException } from '../common/exceptions/application.exception';

import { CategoryRepository } from './repositories/category.repository';
import { ProductRepository } from './repositories/product.repository';

import { Product } from './repositories/domain/product';


export class ProductService {

    constructor(
        private readonly categoryRepository: CategoryRepository,
        private readonly productRepository: ProductRepository
    ) {}

    public async getAll(pageNumber: number): Promise<Product[]> {
        return await this.productRepository.getAll(pageNumber);
    }

    public async getByCategory(pageNumber: number, categoryId: number): Promise<Product[] | null> {
        const category = await this.categoryRepository.findById(categoryId);
        if(!category) throw new ApplicationException('Non-existent category');

        return await this.productRepository.getByCategory(pageNumber, categoryId);
    }

    public async findByName(pageNumber: number, name: string): Promise<Product[] | null> {
        return await this.productRepository.findByName(pageNumber, name);
    }

    public async countAll(): Promise<number> {
        return await this.productRepository.countAll();
    }

    public async countByCategory(categoryId: number): Promise<number> {
        return await this.productRepository.countByCategory(categoryId);
    }

    public async countByName(name: string): Promise<number> {
        return await this.productRepository.countByName(name);
    }

}