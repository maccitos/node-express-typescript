import { Response } from 'express';
import ErrorHandler from './error';

const handleError = (err: ErrorHandler, res: Response) => {
  const { statusCode, message } = err;
  res.status(statusCode).jsonp({
    status: 'info',
    statusCode,
    message,
  });
};

export default handleError;
