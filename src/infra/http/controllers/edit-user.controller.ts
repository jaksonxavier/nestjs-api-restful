import { EditUserUseCase } from '@domain/use-cases/edit-user.use-case';
import {
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';

const editUserBodySchema = z.object({
  name: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(editUserBodySchema);

type EditUserBodySchema = z.infer<typeof editUserBodySchema>;

@Controller('/users')
export class EditUserController {
  constructor(private readonly editUserUseCase: EditUserUseCase) {}

  @Put('/:userId')
  @HttpCode(204)
  async update(
    @Param('userId', new ParseUUIDPipe()) userId: string,
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
