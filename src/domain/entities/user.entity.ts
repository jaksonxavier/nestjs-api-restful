import { Entity } from '@core/entities/entity';
import { UniqueEntityID } from '@core/entities/unique-entity-id';

export interface UserProps {
  name: string;
  slug: string;
  email: string;
  password: string;
}

export class User extends Entity<UserProps> {
  get email() {
    return this.props.email;
  }

  get name() {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
  }

  static create(props: UserProps, id?: UniqueEntityID) {
    const user = new User(props, id);

    return user;
  }
}
