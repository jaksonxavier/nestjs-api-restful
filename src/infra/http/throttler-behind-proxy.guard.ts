import { ThrottlerGuard } from '@nestjs/throttler';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
  protected getRequestKey(context: ExecutionContext): string {
    const request = context.switchToHttp().getRequest();

    const userId = request.user ? request.user.id : 'anonymous';
    const endpoint = request.route.path;

    return `${userId}-${endpoint}`;
  }
}
