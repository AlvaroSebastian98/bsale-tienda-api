import { Request, Response } from 'express'
import { route, GET, POST} from 'awilix-express'

import { BaseController } from '../common/controllers/base.controller';
import { ProductService } from '../services/product.service';

@route('/products')
export class ProductController extends BaseController {

    constructor(private readonly productService: ProductService){
        super();
    }

    @GET()
    public async getAll(req: Request, res: Response) {
        try {
            const pageNumber: number = parseInt((req.query.page as any) || 1);

            const products = await this.productService.getAll(pageNumber);
            const total = await this.productService.countAll();

            res.json({
                success: true,
                data: products,
                count: products?.length,
                total
            });
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @POST()
    public async getByCategory(req: Request, res: Response) {
        try {
            const pageNumber: number = parseInt((req.query.page as any) || 1);
            const categoryId: number = req.body.category_id;

            const products = await this.productService.getByCategory(pageNumber, categoryId);
            const total = await this.productService.countByCategory(categoryId);

            res.json({
                success: true,
                data: products,
                count: products?.length,
                total
            });
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @route('/filter')
    @POST()
    public async findByName(req: Request, res: Response) {
        try {
            const pageNumber: number = parseInt((req.query.page as any) || 1);
            const name: string = req.body.name;

            const products = await this.productService.findByName(pageNumber, name);
            const total = await this.productService.countByName(name);

            res.json({
                success: true,
                data: products,
                count: products?.length,
                total
            });
        } catch (error) {
            this.handleException(error, res);
        }
    }

}