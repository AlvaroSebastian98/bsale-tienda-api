import connector from '../../../common/persistence/mysql.persistence'
import { Product } from '../domain/product';
import { ProductRepository } from '../product.repository';

export class ProductMySQLRepository implements ProductRepository {

    public async getAll(pageNumber: number): Promise<Product[]> {
        const limit: number = 9;
        const offset = (pageNumber * limit) - limit;

        const [rows] = await connector.execute(
            'SELECT * FROM product ORDER BY id DESC LIMIT ?, ?', [offset, limit]
        );

        const [total]: any[] = await connector.execute(
            'SELECT COUNT(id) FROM product'
        );

        console.log('TOTAL', total[0]['COUNT(id)']);

        return rows as Product[];
    }

    public async getByCategory(pageNumber: number, categoryId: number): Promise<Product[] | null> {
        const limit: number = 9;
        const offset = (pageNumber * limit) - limit;

        const [rows]: any = await connector.execute(
            'SELECT * FROM product ' +
            'WHERE category = ? ' +
            'ORDER BY id DESC ' +
            'LIMIT ?, ?',
            [categoryId, offset, limit]
        );

        if(rows.length) return rows as Product[];

        return null;
    }

    public async findByName(pageNumber: number, name: string): Promise<Product[] | null> {
        const limit: number = 9;
        const offset = (pageNumber * limit) - limit;

        const [rows]: any = await connector.execute(
            'SELECT * FROM product ' +
            'WHERE name LIKE ? ' +
            'ORDER BY id DESC ' +
            'LIMIT ?, ?',
            [`%${name}%`, offset, limit]
        );

        if(rows.length) return rows as Product[];

        return null;
    }

    public async countAll(): Promise<number> {
        const [total]: any[] = await connector.execute(
            'SELECT COUNT(id) FROM product'
        );

        return parseInt(total[0]['COUNT(id)']);
    }

    public async countByCategory(categoryId: number): Promise<number> {
        const [total]: any[] = await connector.execute(
            'SELECT COUNT(id) FROM product ' +
            'WHERE category = ? ',
            [categoryId]
        );

        return parseInt(total[0]['COUNT(id)']);
    }

    public async countByName(name: string): Promise<number> {
        const [total]: any[] = await connector.execute(
            'SELECT COUNT(id) FROM product ' +
            'WHERE name LIKE ?',
            [`%${name}%`]
        );

        return parseInt(total[0]['COUNT(id)']);
    }

}