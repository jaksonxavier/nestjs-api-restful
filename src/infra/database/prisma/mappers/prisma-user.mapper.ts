import { User as PrismaUser, Prisma } from '@prisma/client';
import { User } from '@domain/entities/user.entity';
import { UniqueEntityID } from '@core/entities/unique-entity-id';

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        name: raw.name,
        slug: raw.slug,
        email: raw.email,
        password: raw.password,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPersistence(user: User): Prisma.UserCreateInput {
    return {
      id: user.id.toValue(),
      name: user.name,
      slug: user.slug,
      email: user.email,
      password: user.password,
    };
  }
}
