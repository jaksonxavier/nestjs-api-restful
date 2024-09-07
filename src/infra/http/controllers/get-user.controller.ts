import { GetUserByIdUseCase } from '@application/use-cases/get-user-by-id.use-case';
import { Controller, Get, HttpCode, NotFoundException } from '@nestjs/common';
import { UserPresenter } from '../presenters/user.presenter';
import { CurrentUser } from '@infra/auth/current-user.decorator';
import { AuthUser } from '@infra/auth/auth-user';

@Controller('/users')
export class GetUserController {
  constructor(private readonly getUserByIdUseCase: GetUserByIdUseCase) {}

  @Get()
  @HttpCode(200)
  async show(@CurrentUser() { userId }: AuthUser) {
    const output = await this.getUserByIdUseCase.perform(userId);

    if (output.isLeft()) {
      throw new NotFoundException(output.value.message);
    }

    return UserPresenter.toHTTP(output.value);
  }
}
