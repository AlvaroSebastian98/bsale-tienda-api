import { Category } from './domain/category';

export interface CategoryRepository {

    getAll(): Promise<Category[]>;

    findById(id: number): Promise<Category | null>;

}