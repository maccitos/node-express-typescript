/* eslint-disable class-methods-use-this */
import { NextFunction, Request, Response } from 'express';
import { Controller, Get, Post } from '@decorators/express';
import { Model } from 'mongoose';
import passport from 'passport';
import ErrorHandler from '../../../frameworks/common/helpers/errors/error';
import GetAllUsersUseCase from './use_cases/GetAllUsersUseCase';
import UsersRepository from './repository';
import UserDB from './data_access/db';
import { IUsers } from './IUsers';
import ISanitized from './ISanitized';
import AddUserUseCase from './use_cases/AddUsersUseCase';
import GetUserByEmailUseCase from './use_cases/GetUserByEmailUseCase';
import createToken from '../../../frameworks/common/services/token/token';
import Authorized from '../../../frameworks/middlewares/auth.middleware';

@Controller('/users')
export default class UserController {
  private repository: UsersRepository;

  constructor() {
    const userDB = new UserDB();
    const database: Model<IUsers> = userDB.getModel();
    const repository = new UsersRepository(database);
    this.repository = repository;
  }

  @Get('/', [Authorized])
  async GetAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await GetAllUsersUseCase.ExecuteAsync(this.repository);
      return res.jsonp({ response: users });
    } catch (error) {
      return next(error);
    }
  }

  @Post('/signup')
  async SignUp(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await AddUserUseCase.ExecuteAsync(this.repository, req.body);
      return res.jsonp({ response: users });
    } catch (error) {
      return next(error);
    }
  }

  @Post('/signin')
  async SignIn(req: Request, res: Response, next: NextFunction) {
    if (!req.body || !req.body.email) throw new ErrorHandler(400, 'Bad data');
    try {
      const user = await GetUserByEmailUseCase.ExecuteAsync(
        this.repository,
        req.body.email
      );
      if (!user) throw new ErrorHandler(404, 'User not found');
      req.body.user = user;
      passport.authenticate('local', (err, isAuthenticated) => {
        if (!isAuthenticated) throw new ErrorHandler(404, 'User not found');
        const userCopy: IUsers = user;
        userCopy.password = undefined;
        userCopy.salt = undefined;
        userCopy.isActive = undefined;
        userCopy.codeEmailCheck = undefined;
        userCopy.emailValidated = undefined;
        req.login(userCopy, { session: false }, async (error) => {
          if (error) throw new ErrorHandler(500, 'Something went wrong');
          const sanitized: ISanitized = {
            _id: userCopy.id.toString(),
            email: userCopy.email,
            firstName: userCopy.firstName,
            lastName: userCopy.lastName,
          };
          const token = await createToken(sanitized);
          const response = {
            user: userCopy,
            token,
          };
          return res.jsonp({ response }).end();
        });
      })(req, res, next);
      return null;
    } catch (error) {
      return next(error);
    }
  }
}
