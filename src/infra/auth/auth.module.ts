import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { base64Encode } from '@shared/base64-encode';
import { JwtStrategy } from './jwt/jwt-strategy';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      global: true,
      useFactory() {
        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: base64Encode(process.env.JWT_SECRET_KEY),
          publicKey: base64Encode(process.env.JWT_PUBLIC_KEY),
        };
      },
    }),
  ],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
