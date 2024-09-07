import { UsersRepository } from '@application/repositories/users.repository';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users.repository';
import { EditUserUseCase } from './edit-user.use-case';
import { makeUser } from '@test/factories/make-user.factory';
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found.error';

let inMemoryUsersRepository: UsersRepository;
let sut: EditUserUseCase;

describe('Edit User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();

    sut = new EditUserUseCase(inMemoryUsersRepository);
  });

  it('should be able to edit a user', async () => {
    const user = makeUser({
      name: 'John',
    });

    await inMemoryUsersRepository.create(user);

    const editedName = 'John Doe';
    const output = await sut.perform({
      userId: user.id.toValue(),
      name: editedName,
    });

    expect(output.isRight()).toBeTruthy();

    expect(output.value).toMatchObject({
      name: editedName,
    });
  });

  it('should be able to throw an error if the user is not found', async () => {
    const nonExistingUserId = 'non-existing-id';

    const output = await sut.perform({
      userId: nonExistingUserId,
      name: 'Straw Hat',
    });

    expect(output.isLeft()).toBeTruthy();
    expect(output.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
