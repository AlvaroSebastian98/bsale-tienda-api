import { Request, Response } from 'express'
import { route, GET, POST} from 'awilix-express'

import { BaseController } from '../common/controllers/base.controller';
import { CategoryService } from '../services/category.service';

@route('/categories')
export class CategoryController extends BaseController {

    constructor(private readonly categoryService: CategoryService){
        super();
    }

    @GET()
    public async getAll(req: Request, res: Response) {
        try {
            const categories = await this.categoryService.getAll();
            res.json({
                success: true,
                data: categories
            });
        } catch (error) {
            this.handleException(error, res);
        }
    }

}