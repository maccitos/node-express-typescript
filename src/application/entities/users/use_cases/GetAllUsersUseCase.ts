import { IUsers } from '../IUsers';
import UsersRepository from '../repository';

export default class GetAllUsersUseCase {
  public static async ExecuteAsync(repository: UsersRepository): Promise<IUsers[]> {
    const users = await repository.GetAll();
    return users;
  }
}
