import { Either, left, right } from '@core/either';
import { UsersRepository } from '../repositories/users.repository';
import { User } from '../entities/user.entity';
import { UserAlreadyRegisteredError } from './errors/user-already-registered.error';
import { Injectable } from '@nestjs/common';

interface CreateUserUseCaseInput {
  name: string;
  email: string;
  password: string;
}

type CreateUserUseCaseOutput = Either<UserAlreadyRegisteredError, User>;

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async perform({
    name,
    email,
    password,
  }: CreateUserUseCaseInput): Promise<CreateUserUseCaseOutput> {
    const isEmailAlreadyRegistered =
      await this.usersRepository.findByEmail(email);

    if (isEmailAlreadyRegistered) {
      return left(new UserAlreadyRegisteredError(email));
    }

    /**
     * @TODO
     * Generate a unique slug for the user based on the name.
     * Implement password hashing or salting for security.
     */
    const user = User.create({
      name,
      slug: email.split('@').at(0),
      email,
      password,
    });

    await this.usersRepository.create(user);

    return right(user);
  }
}
