import { GetUserByIdUseCase } from '@domain/use-cases/get-user-by-id.use-case';
import {
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserPresenter } from '../presenters/user.presenter';

@Controller('/users')
export class GetUserController {
  constructor(private readonly getUserByIdUseCase: GetUserByIdUseCase) {}

  @Get('/:userId')
  @HttpCode(200)
  async show(@Param('userId', new ParseUUIDPipe()) userId: string) {
    const output = await this.getUserByIdUseCase.perform(userId);

    if (output.isLeft()) {
      throw new NotFoundException(output.value.message);
    }

    return UserPresenter.toHTTP(output.value);
  }
}
