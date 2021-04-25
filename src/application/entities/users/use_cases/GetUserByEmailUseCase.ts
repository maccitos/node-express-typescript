import { IUsers } from '../IUsers';
import UsersRepository from '../repository';

export default class GetUserByEmailUseCase {
  public static async ExecuteAsync(
    repository: UsersRepository,
    email: string
  ): Promise<IUsers | null> {
    const user = await repository.GetUserByEmail(email);
    return user;
  }
}
