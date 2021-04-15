import { Request, Response } from 'express'
import { route, GET, POST} from 'awilix-express'

import { BaseController } from '../common/controllers/base.controller';
import { ProductService } from '../services/product.service';

@route('/products')
export class ProductController extends BaseController {

    constructor(private readonly productService: ProductService){
        super();
    }

    @POST()
    public async getByCategory(req: Request, res: Response) {
        try {
            const categoryId: number = req.body.category_id;
            const products = await this.productService.getByCategory(categoryId);
            res.json({
                success: true,
                data: products,
                count: products?.length
            });
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @route('/filter')
    @POST()
    public async findByName(req: Request, res: Response) {
        try {
            const name: string = req.body.name;
            const products = await this.productService.findByName(name);
            res.json({
                success: true,
                data: products,
                count: products?.length
            });
        } catch (error) {
            this.handleException(error, res);
        }
    }

}