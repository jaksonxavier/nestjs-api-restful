import { EditUserUseCase } from '@application/use-cases/edit-user.use-case';
import {
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { AuthUser } from '@infra/auth/auth-user';
import { CurrentUser } from '@infra/auth/current-user.decorator';

const editUserBodySchema = z.object({
  name: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(editUserBodySchema);

type EditUserBodySchema = z.infer<typeof editUserBodySchema>;

@Controller('/users')
export class EditUserController {
  constructor(private readonly editUserUseCase: EditUserUseCase) {}

  @Put()
  @HttpCode(204)
  async update(
    @CurrentUser() { userId }: AuthUser,
    @Body(bodyValidationPipe) body: EditUserBodySchema,
  ) {
    const { name } = body;

    const output = await this.editUserUseCase.perform({
      name,
      userId,
    });

    if (output.isLeft()) {
      throw new NotFoundException(output.value.message);
    }
  }
}
