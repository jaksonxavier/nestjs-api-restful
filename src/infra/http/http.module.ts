import { Module } from '@nestjs/common';
import { CreateUserController } from './controllers/create-user.controller';
import { DatabaseModule } from '../database/database.module';
import { CreateUserUseCase } from '@domain/use-cases/create-user.use-case';
import { GetUserController } from './controllers/get-user.controller';
import { GetUserByIdUseCase } from '@domain/use-cases/get-user-by-id.use-case';
import { EditUserController } from './controllers/edit-user.controller';
import { EditUserUseCase } from '@domain/use-cases/edit-user.use-case';
import { DeleteUserController } from './controllers/delete-user.controller';
import { DeleteUserByIdUseCase } from '@domain/use-cases/delete-user-by-id.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateUserController,
    GetUserController,
    EditUserController,
    DeleteUserController,
  ],
  providers: [
    CreateUserUseCase,
    GetUserByIdUseCase,
    EditUserUseCase,
    DeleteUserByIdUseCase,
  ],
})
export class HttpModule {}
