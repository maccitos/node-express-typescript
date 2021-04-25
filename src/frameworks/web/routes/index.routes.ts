import Express from 'express';
import { attachControllers } from '@decorators/express';
import UserController from '../../../application/entities/users/controller';
import ErrorHandler from '../../common/helpers/errors/error';

export default class CustomRoutes {
  app: Express.Application;

  constructor(app: Express.Application) {
    this.app = app;
  }

  createRoutes() {
    const routes = Express.Router();
    attachControllers(routes, [UserController]);
    this.app.use('/v1/api/', routes);
    this.app.use('*', () => {
      throw new ErrorHandler(404, 'Not Found.');
    });
  }
}
