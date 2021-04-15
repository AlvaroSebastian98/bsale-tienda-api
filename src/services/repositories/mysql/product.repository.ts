import connector from '../../../common/persistence/mysql.persistence'
import { Product } from '../domain/product';
import { ProductRepository } from '../product.repository';

export class ProductMySQLRepository implements ProductRepository {

    public async getAll(): Promise<Product[]> {
        const [rows] = await connector.execute(
            'SELECT * FROM product ORDER BY id DESC'
        );
        return rows as Product[];
    }

    public async getByCategory(categoryId: number): Promise<Product[] | null> {
        const [rows]: any = await connector.execute(
            'SELECT * FROM product ' +
            'WHERE category = ? ' +
            'ORDER BY id DESC',
            [categoryId]
        );

        if(rows.length) return rows as Product[];

        return null;
    }

    public async findByName(name: string): Promise<Product[] | null> {
        const [rows]: any = await connector.execute(
            'SELECT * FROM product ' +
            'WHERE name LIKE ? ' +
            'ORDER BY id DESC',
            [`%${name}%`]
        );

        if(rows.length) return rows as Product[];

        return null;
    }

}