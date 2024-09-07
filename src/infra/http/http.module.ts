import { Module } from '@nestjs/common';
import { CreateUserController } from './controllers/create-user.controller';
import { DatabaseModule } from '../database/database.module';
import { CreateUserUseCase } from '@domain/use-cases/create-user.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateUserController],
  providers: [CreateUserUseCase],
})
export class HttpModule {}
