import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import * as request from 'supertest';
import { UserFactory } from '@test/factories/make-user.factory';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { TestModule } from '@test/test.module';

describe('Delete User (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;
  let userFactory: UserFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TestModule],
      providers: [UserFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);
    userFactory = moduleRef.get(UserFactory);

    await app.init();
  });

  test('[DELETE] /users/:userId', async () => {
    const user = await userFactory.makePrismaUser();

    const accessToken = jwt.sign({ uid: user.id.toString() });

    const response = await request(app.getHttpServer())
      .delete(`/users/${user.id.toValue()}`)
      .set('Authorization', `Bearer ${accessToken}`)
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
