import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import * as request from 'supertest';
import { HttpModule } from '../http.module';
import { UserFactory } from '@test/factories/make-user.factory';
import { DatabaseModule } from '@infra/database/database.module';

describe('Create User (E2E)', () => {
  let app: INestApplication;
  let userFactory: UserFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule, DatabaseModule],
      providers: [UserFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    userFactory = moduleRef.get(UserFactory);

    await app.init();
  });

  test('[GET] /users/:userId', async () => {
    const user = await userFactory.makePrismaUser();

    const response = await request(app.getHttpServer())
      .get(`/users/${user.id.toValue()}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      slug: user.slug,
    });
  });
});
