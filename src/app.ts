import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import router from './route/apiRoute';
import globalErrorHandler from './middleware/globalErrorHandler';
import responseMessage from './constant/responseMessage';
import httpError from './utils/httpError';
import helmet from 'helmet';
import config from './config/config';
import cors from 'cors';

const app = express();
app.use(helmet());

app.use(express.json());
app.use(express.static(path.join(__dirname, '../', 'public')));
app.use('/api/v1', router);
app.use(
    cors({
        origin: [config.FRONTEND_URL as string],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
        credentials: true
    })
);

//404 error
app.use((req: Request, _: Response, next: NextFunction) => {
    const error = new Error(responseMessage.NOT_FOUND('route'));
    httpError(next, error, req, 404);
});

//global error handling
app.use(globalErrorHandler);

export default app;
