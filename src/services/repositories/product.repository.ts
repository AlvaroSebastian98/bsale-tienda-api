import { Product } from './domain/product';

export interface ProductRepository {

    getAll(pageNumber: number): Promise<Product[]>;

    getByCategory(pageNumber: number, categoryId: number): Promise<Product[] | null>;

    findByName(pageNumber: number, name: string): Promise<Product[] | null>;

    countAll(): Promise<number>;

    countByCategory(categoryId: number): Promise<number>;

    countByName(name: string): Promise<number>;

}