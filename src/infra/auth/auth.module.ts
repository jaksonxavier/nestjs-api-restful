import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { base64Encode } from '@shared/base64-encode';
import { JwtStrategy } from './jwt/jwt-strategy';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { EnvModule } from '@infra/env/env.module';
import { EnvService } from '@infra/env/env.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      global: true,
      useFactory(env: EnvService) {
        const privateKey = env.get('JWT_SECRET_KEY');
        const publicKey = env.get('JWT_PUBLIC_KEY');

        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: base64Encode(privateKey),
          publicKey: base64Encode(publicKey),
        };
      },
    }),
  ],
  providers: [
    JwtStrategy,
    EnvService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
