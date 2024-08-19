import express, { Request, Response, Application, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import router from './routes';
import crons from './crons';
import httpStatus from 'http-status';
import ApiError from './utils/ApiError';
import { successHandler, errorHandler } from './config/morgan';
import { errorConverter, errorHandlers } from './middlewares/error.middleware';

const app: Application = express();

// HTTP request logger middleware
app.use(successHandler);
app.use(errorHandler);

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());

// app.use(crons);
app.use('/v1/api', router);

// send back a 404 error for any unknown api request
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandlers);

export default app;
