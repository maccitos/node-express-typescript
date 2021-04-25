import { Request, Response, NextFunction } from 'express';

/* eslint-disable global-require */
const passportConfig = (req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('../../config/strategies/local');
  next();
};
export default passportConfig;
