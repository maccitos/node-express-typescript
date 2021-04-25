/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Middleware } from '@decorators/express';
import ErrorHandler from '../common/helpers/errors/error';
import { decrypt } from '../common/services/token/encrypt';
import config from '../../config/config';

export default class Authorized implements Middleware {
  private async validateAccessToken(req: Request): Promise<JSON> {
    const accessToken = req.headers.authorization;
    if (!accessToken) throw new ErrorHandler(401, 'Token expired or invalid.');
    return new Promise((resolve, reject) => {
      const token = accessToken.replace('Bearer ', '');
      const { secretKey } = config;
      jwt.verify(token, secretKey, (err: jwt.VerifyErrors | null, decoded: any) => {
        if (err) reject(new ErrorHandler(401, 'Failed to authenticate token.'));
        if (!decoded) reject(new ErrorHandler(401, 'Token expired or invalid.'));
        const decriptedData = decrypt(decoded.data);
        resolve(JSON.parse(decriptedData));
      });
    });
  }

  public async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await this.validateAccessToken(req);
      req.body.user = user;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}
