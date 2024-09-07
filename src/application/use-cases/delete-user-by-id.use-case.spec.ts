import { UsersRepository } from '@application/repositories/users.repository';
import { DeleteUserByIdUseCase } from './delete-user-by-id.use-case';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users.repository';
import { makeUser } from '@test/factories/make-user.factory';

let inMemoryUsersRepository: UsersRepository;
let sut: DeleteUserByIdUseCase;

describe('Delete User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();

    sut = new DeleteUserByIdUseCase(inMemoryUsersRepository);
  });

  it('should be able to delete a user', async () => {
    const user = makeUser();

    await inMemoryUsersRepository.create(user);

    await sut.perform(user.id.toValue());

    const deletedUser = await inMemoryUsersRepository.findById(
      user.id.toValue(),
    );

    expect(deletedUser).toBeNull();
  });
});
