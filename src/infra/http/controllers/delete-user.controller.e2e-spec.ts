import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import * as request from 'supertest';
import { HttpModule } from '../http.module';
import { UserFactory } from '@test/factories/make-user.factory';
import { DatabaseModule } from '@infra/database/database.module';
import { PrismaService } from '@infra/database/prisma/prisma.service';

describe('Delete User (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let userFactory: UserFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule, DatabaseModule],
      providers: [UserFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);
    userFactory = moduleRef.get(UserFactory);

    await app.init();
  });

  test('[DELETE] /users/:userId', async () => {
    const user = await userFactory.makePrismaUser();

    const response = await request(app.getHttpServer())
      .delete(`/users/${user.id.toValue()}`)
      .send();

    expect(response.statusCode).toBe(200);

    const userOnDatabase = await prisma.user.findUnique({
      where: {
        id: user.id.toString(),
      },
    });

    expect(userOnDatabase).toBeNull();
  });
});
