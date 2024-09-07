import { User } from '@domain/entities/user.entity';
import { UsersRepository } from '@application/repositories/users.repository';

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id.toValue() === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(user: User): Promise<void> {
    this.items.push(user);
  }

  async save(user: User): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === user.id);

    this.items[itemIndex] = user;
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id.toValue() === id);

    this.items.splice(itemIndex, 1);
  }
}
