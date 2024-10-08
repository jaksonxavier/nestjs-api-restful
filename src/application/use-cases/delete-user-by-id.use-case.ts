import { UsersRepository } from '@application/repositories/users.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteUserByIdUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async perform(userId: string): Promise<void> {
    await this.usersRepository.delete(userId);
  }
}
