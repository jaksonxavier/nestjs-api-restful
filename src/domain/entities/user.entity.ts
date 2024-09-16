import { Entity } from '@core/entities/entity';
import { UniqueEntityID } from '@core/entities/unique-entity-id';
import { UserStatus } from './types/user-status.type';

export interface UserProps {
  name: string;
  slug: string;
  email: string;
  password: string;
  status?: UserStatus;
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

  get slug() {
    return this.props.slug;
  }

  get password() {
    return this.props.password;
  }

  get status() {
    return this.props.status;
  }

  static create(props: UserProps, id?: UniqueEntityID) {
    const user = new User(props, id);

    return user;
  }
}
