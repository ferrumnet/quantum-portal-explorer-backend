import express, { Request, Response, Application, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import router from './routes';
import httpStatus from 'http-status';
import ApiError from './utils/ApiError';

const app: Application = express();
// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());

app.use('/v1/api', router);

// send back a 404 error for any unknown api request
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

export default app;
