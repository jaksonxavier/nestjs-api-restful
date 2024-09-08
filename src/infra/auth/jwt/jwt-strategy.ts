import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { base64Encode } from '@shared/base64-encode';
import { AuthUser } from '../auth-user';
import { EnvService } from '@infra/env/env.service';

type Payload = {
  uid: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: EnvService) {
    const publicKey = config.get('JWT_PUBLIC_KEY');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: base64Encode(publicKey),
      algorithms: ['RS256'],
    });
  }

  async validate(payload: Payload): Promise<AuthUser> {
    return {
      userId: payload.uid,
    };
  }
}
