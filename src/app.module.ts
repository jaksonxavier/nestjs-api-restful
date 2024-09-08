import { Module } from '@nestjs/common';
import { HttpModule } from './infra/http/http.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerBehindProxyGuard } from './infra/http/throttler-behind-proxy.guard';
import { EnvModule } from '@infra/env/env.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from '@infra/env/env';

@Module({
  imports: [
    HttpModule,
    EnvModule,
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 6000,
        limit: 10,
      },
    ]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
  ],
})
export class AppModule {}
