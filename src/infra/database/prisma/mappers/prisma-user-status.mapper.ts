import { UserStatus } from '@domain/entities/types/user-status.type';
import { UserStatus as RawUserStatus } from '@prisma/client';

export class PrismaUserStatusMapper {
  static toDomain(status: RawUserStatus): UserStatus {
    switch (status) {
      case 'ACTIVE':
        return UserStatus.ACTIVE;
      case 'DEACTIVATED':
        return UserStatus.DEACTIVATED;
      case 'PERMANENTLY_DELETED':
        return UserStatus.PERMANENTLY_DELETED;
      default:
        return UserStatus.PENDING_VERIFICATION;
    }
  }

  static toPersistence(status: UserStatus): RawUserStatus {
    switch (status) {
      case UserStatus.ACTIVE:
        return 'ACTIVE';
      case UserStatus.DEACTIVATED:
        return 'DEACTIVATED';
      case UserStatus.PERMANENTLY_DELETED:
        return 'PERMANENTLY_DELETED';
      default:
        return 'PENDING_VERIFICATION';
    }
  }
}
