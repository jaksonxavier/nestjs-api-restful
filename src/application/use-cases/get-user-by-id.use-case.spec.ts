import { UsersRepository } from '@domain/repositories/users.repository';
import { GetUserByIdUseCase } from './get-user-by-id.use-case';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users.repository';
import { makeUser } from '@test/factories/make-user.factory';
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found.error';

let inMemoryUsersRepository: UsersRepository;
let sut: GetUserByIdUseCase;

describe('Get User by ID', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();

    sut = new GetUserByIdUseCase(inMemoryUsersRepository);
  });

  it('should be able to get a user by ID', async () => {
    const user = makeUser();
    await inMemoryUsersRepository.create(user);

    const output = await sut.perform(user.id.toValue());

    expect(output.isRight()).toBeTruthy();
    expect(output.value).toBe(user);
  });

  it('should be able to throw an error if the user is not found', async () => {
    const nonExistingUserId = 'non-existing-id';

    const output = await sut.perform(nonExistingUserId);

    expect(output.isLeft()).toBeTruthy();
    expect(output.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
