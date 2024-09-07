import { HashGenerator } from '@application/cryptography/hash-generator';
import { hash } from 'bcryptjs';

export class BcryptHasher implements HashGenerator {
  private HASH_SALT_LENGTH = 8;

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH);
  }
}
