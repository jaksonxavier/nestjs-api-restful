import { Module } from '@nestjs/common';
import { CreateUserController } from './controllers/create-user.controller';
import { DatabaseModule } from '../database/database.module';
import { CreateUserUseCase } from '@domain/use-cases/create-user.use-case';
import { GetUserController } from './controllers/get-user.controller';
import { GetUserByIdUseCase } from '@domain/use-cases/get-user-by-id.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateUserController, GetUserController],
  providers: [CreateUserUseCase, GetUserByIdUseCase],
})
export class HttpModule {}
