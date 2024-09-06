import { UsersRepository } from '@domain/repositories/users.repository';

export class DeleteUserByIdUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async perform(userId: string): Promise<void> {
    await this.usersRepository.delete(userId);
  }
}
