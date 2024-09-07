import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { CreateUserUseCase } from '@domain/use-cases/create-user.use-case';

const createUserBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>;

@Controller('/users')
export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createUserBodySchema))
  async store(@Body() body: CreateUserBodySchema) {
    const { email, name, password } = body;

    const output = await this.createUserUseCase.perform({
      email,
      name,
      password,
    });

    if (output.isLeft()) {
      throw new BadRequestException(output.value.message);
    }
  }
}
