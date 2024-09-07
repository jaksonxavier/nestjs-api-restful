import { AuthUserUseCase } from '@application/use-cases/auth-user.use-case';
import { Public } from '@infra/auth/public';
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { WrongCredentialsError } from '@application/use-cases/errors/wrong-credentials-error';

const authBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AuthBodySchema = z.infer<typeof authBodySchema>;

@Controller('/auth')
@Public()
export class AuthController {
  constructor(private authUserUseCase: AuthUserUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(authBodySchema))
  async handle(@Body() body: AuthBodySchema) {
    const { email, password } = body;

    const output = await this.authUserUseCase.perform({
      email,
      password,
    });

    if (output.isLeft()) {
      const error = output.value;

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    const { accessToken } = output.value;

    return {
      access_token: accessToken,
    };
  }
}
