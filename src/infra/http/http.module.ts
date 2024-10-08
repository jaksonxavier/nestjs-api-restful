import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CreateUserController } from './controllers/create-user.controller';
import { DatabaseModule } from '../database/database.module';
import { CreateUserUseCase } from '@application/use-cases/create-user.use-case';
import { GetUserController } from './controllers/get-user.controller';
import { GetUserByIdUseCase } from '@application/use-cases/get-user-by-id.use-case';
import { EditUserController } from './controllers/edit-user.controller';
import { EditUserUseCase } from '@application/use-cases/edit-user.use-case';
import { DeleteUserController } from './controllers/delete-user.controller';
import { DeleteUserByIdUseCase } from '@application/use-cases/delete-user-by-id.use-case';
import { CryptographyModule } from '@infra/cryptography/cryptography.module';
import { AuthModule } from '@infra/auth/auth.module';
import { AuthController } from './controllers/auth.controller';
import { AuthUserUseCase } from '@application/use-cases/auth-user.use-case';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { EnvModule } from '@infra/env/env.module';

@Module({
  imports: [DatabaseModule, CryptographyModule, AuthModule, EnvModule],
  controllers: [
    CreateUserController,
    GetUserController,
    EditUserController,
    DeleteUserController,
    AuthController,
  ],
  providers: [
    CreateUserUseCase,
    GetUserByIdUseCase,
    EditUserUseCase,
    DeleteUserByIdUseCase,
    AuthUserUseCase,
  ],
})
export class HttpModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
