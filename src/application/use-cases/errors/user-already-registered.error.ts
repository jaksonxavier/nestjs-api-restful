import { UseCaseError } from '@core/errors/use-case-error';

export class UserAlreadyRegisteredError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`User "${identifier}" already registered.`);
  }
}
