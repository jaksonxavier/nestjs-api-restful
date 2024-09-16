import { User as PrismaUser, Prisma } from '@prisma/client';
import { User } from '@domain/entities/user.entity';
import { UniqueEntityID } from '@core/entities/unique-entity-id';
import { PrismaUserStatusMapper } from './prisma-user-status.mapper';

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        name: raw.name,
        slug: raw.slug,
        email: raw.email,
        password: raw.password,
        status: PrismaUserStatusMapper.toDomain(raw.status),
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
      status: PrismaUserStatusMapper.toPersistence(user.status),
    };
  }
}
