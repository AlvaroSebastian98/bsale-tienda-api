import { CategoryRepository } from './repositories/category.repository';
import { Category } from './repositories/domain/category';


export class CategoryService {

    constructor(
        private readonly categoryRepository: CategoryRepository
    ) {}

    public async getAll(): Promise<Category[]> {
        return await this.categoryRepository.getAll();
    }

}