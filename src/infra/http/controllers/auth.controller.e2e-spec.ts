import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UserFactory } from '@test/factories/make-user.factory';
import { hash } from 'bcryptjs';
import * as request from 'supertest';
import { TestModule } from '@test/test.module';

describe('Auth (E2E)', () => {
  let app: INestApplication;
  let userFactory: UserFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TestModule],
      providers: [UserFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    userFactory = moduleRef.get(UserFactory);

    await app.init();
  });

  test('[POST] /auth', async () => {
    const payload = {
      email: 'johndoe@example.com',
      password: '1234',
    };

    await userFactory.makePrismaUser({
      email: payload.email,
      password: await hash(payload.password, 8),
    });

    const response = await request(app.getHttpServer())
      .post('/auth')
      .send(payload);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      access_token: expect.any(String),
    });
  });
});
