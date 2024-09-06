import { UniqueEntityID } from '@core/entities/unique-entity-id';
import { User, UserProps } from '@domain/entities/user.entity';
import { faker } from '@faker-js/faker';

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityID,
) {
  const user = User.create(
    {
      name: faker.person.fullName(),
      slug: faker.lorem.slug(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  );

  return user;
}
