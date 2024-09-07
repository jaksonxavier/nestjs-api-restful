import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import * as request from 'supertest';
import { HttpModule } from '../http.module';
import { UserFactory } from '@test/factories/make-user.factory';
import { DatabaseModule } from '@infra/database/database.module';
import { JwtService } from '@nestjs/jwt';

describe('Create User (E2E)', () => {
  let app: INestApplication;
  let jwt: JwtService;
  let userFactory: UserFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule, DatabaseModule],
      providers: [UserFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    jwt = moduleRef.get(JwtService);
    userFactory = moduleRef.get(UserFactory);

    await app.init();
  });

  test('[GET] /users/:userId', async () => {
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
