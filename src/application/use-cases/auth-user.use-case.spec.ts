import { FakeEncrypter } from '@test/cryptography/fake-encrypter';
import { FakeHasher } from '@test/cryptography/fake-hasher';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users.repository';
import { AuthUserUseCase } from './auth-user.use-case';
import { makeUser } from '@test/factories/make-user.factory';
import { WrongCredentialsError } from './errors/wrong-credentials-error';

let inMemoryUsersRepository: InMemoryUsersRepository;
let fakeHasher: FakeHasher;
let encrypter: FakeEncrypter;

let sut: AuthUserUseCase;

describe('Auth User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    fakeHasher = new FakeHasher();
    encrypter = new FakeEncrypter();

    sut = new AuthUserUseCase(inMemoryUsersRepository, fakeHasher, encrypter);
  });

  it('should be able to authenticate a user', async () => {
    const user = makeUser({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('1234'),
    });

    await inMemoryUsersRepository.create(user);

    const output = await sut.perform({
      email: 'johndoe@example.com',
      password: '1234',
    });

    expect(output.isRight()).toBe(true);
    expect(output.value).toEqual({
      accessToken: expect.any(String),
    });
  });

  it('should return an error if the email does not exist', async () => {
    const user = makeUser({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('1234'),
    });

    await inMemoryUsersRepository.create(user);

    const output = await sut.perform({
      email: 'nonexistent@example.com',
      password: '1234',
    });

    expect(output.isLeft()).toBe(true);
    expect(output.value).toEqual(new WrongCredentialsError());
  });

  it('should return an error if the password is incorrect', async () => {
    const user = makeUser({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('1234'),
    });

    await inMemoryUsersRepository.create(user);

    const output = await sut.perform({
      email: 'johndoe@example.com',
      password: 'wrongpassword',
    });

    expect(output.isLeft()).toBe(true);
    expect(output.value).toEqual(new WrongCredentialsError());
  });
});
