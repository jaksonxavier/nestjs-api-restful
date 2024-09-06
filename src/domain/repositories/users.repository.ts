import { User } from '../entities/user.entity';

export abstract class UsersRepository {
  abstract findById(id: string): Promise<User | null>;
  abstract create(user: User): Promise<void>;
  abstract save(user: User): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
