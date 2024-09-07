import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { PrismaService } from '@infra/database/prisma/prisma.service';
import * as request from 'supertest';
import { HttpModule } from '../http.module';

describe('Create User (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[POST] /users', async () => {
    const body = {
      name: 'Straw Hat',
      email: 'strawhat@mail.com',
      password: '1234',
    };

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(body);

    expect(response.statusCode).toBe(201);

    const userOnDatabase = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    expect(userOnDatabase).toBeTruthy();
  });
});
