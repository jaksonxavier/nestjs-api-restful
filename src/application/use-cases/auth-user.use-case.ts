import { Either, left, right } from '@core/either';
import { WrongCredentialsError } from './errors/wrong-credentials-error';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from '@domain/repositories/users.repository';
import { HashComparer } from '@application/cryptography/hash-comparer';
import { Encrypter } from '@application/cryptography/encrypter';

interface AuthUserUseCaseInput {
  email: string;
  password: string;
}

type AuthUserUseCaseOutput = Either<
  WrongCredentialsError,
  {
    accessToken: string;
  }
>;

@Injectable()
export class AuthUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async perform({
    email,
    password,
  }: AuthUserUseCaseInput): Promise<AuthUserUseCaseOutput> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      return left(new WrongCredentialsError());
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      return left(new WrongCredentialsError());
    }

    const accessToken = await this.encrypter.encrypt({
      uid: user.id.toString(),
    });

    return right({
      accessToken,
    });
  }
}
