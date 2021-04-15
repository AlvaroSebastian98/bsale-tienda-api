import connector from '../../../common/persistence/mysql.persistence'
import { Category } from '../domain/category';
import { CategoryRepository } from '../category.repository';

export class CategoryMySQLRepository implements CategoryRepository {

    public async getAll(): Promise<Category[]> {
        const [rows] = await connector.execute(
            'SELECT * FROM category ORDER BY id DESC'
        );
        return rows as Category[];
    }

    public async findById(id: number): Promise<Category | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM category WHERE id = ?',
            [id]
        );

        if(rows.length) return rows[0] as Category;

        return null;
    }

}