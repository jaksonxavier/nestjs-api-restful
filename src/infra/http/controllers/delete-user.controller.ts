import { DeleteUserByIdUseCase } from '@application/use-cases/delete-user-by-id.use-case';
import { AuthUser } from '@infra/auth/auth-user';
import { CurrentUser } from '@infra/auth/current-user.decorator';
import { Controller, Delete, HttpCode } from '@nestjs/common';

@Controller('/users')
export class DeleteUserController {
  constructor(private readonly deleteUserByIdUseCase: DeleteUserByIdUseCase) {}

  @Delete()
  @HttpCode(200)
  async destroy(@CurrentUser() { userId }: AuthUser) {
    await this.deleteUserByIdUseCase.perform(userId);
  }
}
