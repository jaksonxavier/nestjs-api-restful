import { Either, left, right } from '@core/either';
import { UsersRepository } from '@domain/repositories/users.repository';
import { User } from '@domain/entities/user.entity';
import { UserAlreadyRegisteredError } from './errors/user-already-registered.error';
import { Injectable } from '@nestjs/common';
import { HashGenerator } from '@application/cryptography/hash-generator';

interface CreateUserUseCaseInput {
  name: string;
  email: string;
  password: string;
}

type CreateUserUseCaseOutput = Either<UserAlreadyRegisteredError, User>;

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashGenerator: HashGenerator,
  ) {}

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

    const hashedPassword = await this.hashGenerator.hash(password);

    /**
     * @TODO
     * Generate a unique slug for the user based on the name.
     */
    const user = User.create({
      name,
      slug: email.split('@').at(0),
      email,
      password: hashedPassword,
    });

    await this.usersRepository.create(user);

    return right(user);
  }
}
