import { DeleteUserByIdUseCase } from '@application/use-cases/delete-user-by-id.use-case';
import {
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';

@Controller('/users')
export class DeleteUserController {
  constructor(private readonly deleteUserByIdUseCase: DeleteUserByIdUseCase) {}

  @Delete('/:userId')
  @HttpCode(200)
  async destroy(@Param('userId', new ParseUUIDPipe()) userId: string) {
    await this.deleteUserByIdUseCase.perform(userId);
  }
}
