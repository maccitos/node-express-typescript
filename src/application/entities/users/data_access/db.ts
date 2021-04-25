import { Model, model } from 'mongoose';
import { IUsers } from '../IUsers';
import UserSchema from './schema';

export default class UserDB {
  modelUser: Model<IUsers> | undefined;

  // eslint-disable-next-line class-methods-use-this
  getModel(): Model<IUsers> {
    return model<IUsers>('Users', UserSchema);
  }
}
