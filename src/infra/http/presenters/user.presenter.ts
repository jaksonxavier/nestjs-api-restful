import { User } from '@domain/entities/user.entity';

export class UserPresenter {
  static toHTTP(user: User) {
    return {
      id: user.id.toString(),
      name: user.name,
      slug: user.slug,
      status: user.status,
    };
  }
}
