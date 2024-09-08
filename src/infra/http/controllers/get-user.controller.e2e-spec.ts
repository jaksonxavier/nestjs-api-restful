import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import * as request from 'supertest';
import { UserFactory } from '@test/factories/make-user.factory';
import { JwtService } from '@nestjs/jwt';
import { TestModule } from '@test/test.module';

describe('Create User (E2E)', () => {
  let app: INestApplication;
  let jwt: JwtService;
  let userFactory: UserFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TestModule],
      providers: [UserFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    jwt = moduleRef.get(JwtService);
    userFactory = moduleRef.get(UserFactory);

    await app.init();
  });

  test('[GET] /users', async () => {
    const user = await userFactory.makePrismaUser();

    const accessToken = jwt.sign({ uid: user.id.toString() });

    const response = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      slug: user.slug,
    });
  });
});
