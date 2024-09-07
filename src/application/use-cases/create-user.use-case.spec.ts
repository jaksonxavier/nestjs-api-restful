import { InMemoryUsersRepository } from '@test/repositories/in-memory-users.repository';
import { CreateUserUseCase } from './create-user.use-case';
import { UsersRepository } from '@domain/repositories/users.repository';
import { User } from '@domain/entities/user.entity';
import { makeUser } from '@test/factories/make-user.factory';
import { UserAlreadyRegisteredError } from './errors/user-already-registered.error';
import { FakeHasher } from '@test/cryptography/fake-hasher';

let inMemoryUsersRepository: UsersRepository;
let fakeHasher: FakeHasher;

let sut: CreateUserUseCase;

describe('Create User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    fakeHasher = new FakeHasher();

    sut = new CreateUserUseCase(inMemoryUsersRepository, fakeHasher);
  });

  it('should be able to create a new user', async () => {
    const output = await sut.perform({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '4321',
    });

    expect(output.isRight()).toBeTruthy();
    expect(output.value).toBeInstanceOf(User);
  });

  it('should not be able to create a user if the email is already registered', async () => {
    const email = 'jonedoe@example.com';

    const user = makeUser({ email });
    await inMemoryUsersRepository.create(user);

    const output = await sut.perform({
      name: 'Jane Doe',
      email,
      password: '1234',
    });

    expect(output.isLeft()).toBeTruthy();
    expect(output.value).toBeInstanceOf(UserAlreadyRegisteredError);
  });

  it('should hash user password upon creation', async () => {
    const password = '1234';
    const output = await sut.perform({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password,
    });

    const hashedPassword = await fakeHasher.hash(password);

    expect(output.isRight()).toBeTruthy();
    const user = output.value as User;
    expect(user.password).toEqual(hashedPassword);
  });
});
