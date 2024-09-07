import { Either, left, right } from '@core/either';
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found.error';
import { User } from '@domain/entities/user.entity';
import { UsersRepository } from '@domain/repositories/users.repository';
import { Injectable } from '@nestjs/common';

interface EditUserUseCaseInput {
  userId: string;
  name: string;
}

type EditUserUseCaseOutput = Either<ResourceNotFoundError, User>;

@Injectable()
export class EditUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async perform({
    userId,
    name,
  }: EditUserUseCaseInput): Promise<EditUserUseCaseOutput> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      return left(new ResourceNotFoundError());
    }

    user.name = name;

    await this.usersRepository.save(user);

    return right(user);
  }
}
