import { Either, left, right } from '@core/either';
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found.error';
import { User } from '@domain/entities/user.entity';
import { UsersRepository } from '@domain/repositories/users.repository';
import { Injectable } from '@nestjs/common';

type GetUserByIdUseCaseOutput = Either<ResourceNotFoundError, User>;

@Injectable()
export class GetUserByIdUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async perform(userId: string): Promise<GetUserByIdUseCaseOutput> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      return left(new ResourceNotFoundError());
    }

    return right(user);
  }
}
