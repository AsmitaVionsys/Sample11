import { NextFunction, Request, Response } from 'express';
import httpError from '../utils/httpError';
import httpResponse from '../utils/httpResponse';
import responseMessage from '../constant/responseMessage';
import quicker from '../utils/quicker';

export default {
    self: (req: Request, res: Response, next: NextFunction) => {
        try {
            httpResponse(req, res, 200, responseMessage.SUCCESS);
        } catch (error) {
            httpError(next, error, req, 500);
        }
    },

    health: (req: Request, res: Response, next: NextFunction) => {
        try {
            const healthData = {
                system: quicker.systemHealth,
                application: quicker.applicationHealth,
                timeStamp: Date.now()
            };
            httpResponse(req, res, 200, responseMessage.SUCCESS, healthData);
        } catch (error) {
            httpError(next, error, req, 500);
        }
    }
};
