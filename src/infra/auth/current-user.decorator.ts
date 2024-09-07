import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { AuthUser } from './auth-user';

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.user as AuthUser;
  },
);
