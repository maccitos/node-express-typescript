import { Model } from 'mongoose';
import { IUsers } from './IUsers';

export default class UsersRepository {
  database: Model<IUsers>;

  constructor(database: Model<IUsers>) {
    this.database = database;
  }

  public async GetAll(): Promise<IUsers[]> {
    const users = await this.database.find().exec();
    return users;
  }

  public async GetUserByEmail(email: string): Promise<IUsers | null> {
    const user = await this.database.findOne({ email }).exec();
    return user;
  }

  public async AddUser(user: IUsers): Promise<void> {
    await this.database.create(user);
  }
}
