import { Request, Response } from 'express';
import ErrorHandler from '../common/helpers/errors/error';
import handleError from '../common/helpers/errors/handleError';

const errorMiddleware = (err: ErrorHandler, req: Request, res: Response) => {
  handleError(err, res);
};

export default errorMiddleware;
