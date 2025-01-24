import { Request, Response } from 'express';
import config from '../config/config';
import { EApplicationEnvironment } from '../constant/application';
import { THttpResponse } from '../types/types';
import logger from './logger';

 
export default (req: Request, res: Response, responseStatusCode: number, responseMessage: string, data: unknown = null): void => {
    const response: THttpResponse = {
        success: true,
        statusCode: responseStatusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.url
        },
        message: responseMessage,
        data: data
    };

    if (config.NODE_ENV === EApplicationEnvironment.PRODUCTION) {
        delete response.request.ip;
    }

    logger.log('RESPONSE APPLICATION', {
        meta: {
            returns: response
        }
    });
    res.status(responseStatusCode).json(response);
};
