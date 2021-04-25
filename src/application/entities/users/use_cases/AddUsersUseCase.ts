import { IUsers } from '../IUsers';
import UsersRepository from '../repository';

export default class AddUserUseCase {
  public static async ExecuteAsync(
    repository: UsersRepository,
    user: IUsers
  ): Promise<void> {
    const users = await repository.AddUser(user);
    console.log(users);
  }
}
