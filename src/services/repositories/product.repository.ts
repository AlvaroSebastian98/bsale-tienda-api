import { Product } from './domain/product';

export interface ProductRepository {

    getAll(): Promise<Product[]>;

    getByCategory(categoryId: number): Promise<Product[] | null>;

    findByName(name: string): Promise<Product[] | null>;

}