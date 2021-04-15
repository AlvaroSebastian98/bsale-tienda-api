import { Response } from 'express';
import { ApplicationException } from '../exceptions/application.exception';

export abstract class BaseController {

    handleException(err: any, res: Response) {
        if(err instanceof ApplicationException) {
            res.status(400);
            res.json({
                success: false,
                error: {
                    code: 400,
                    message: err.message
                }
            });
        } else {
            throw new Error(err);
        }
    }

}