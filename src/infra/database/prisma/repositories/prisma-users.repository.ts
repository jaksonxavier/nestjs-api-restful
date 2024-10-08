import { User } from '@domain/entities/user.entity';
import { UsersRepository } from '@application/repositories/users.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/prisma-user.mapper';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPersistence(user);

    await this.prisma.user.create({ data });
  }

  async save(user: User): Promise<void> {
    const data = PrismaUserMapper.toPersistence(user);

    await this.prisma.user.update({
      where: {
        id: user.id.toValue(),
      },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  }
}
