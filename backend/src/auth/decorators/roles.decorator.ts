import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@prisma/client';

export const ROLES_KEY = 'roles';

/**
 * Restricts access to the specified user roles.
 *
 * Example:
 * @Roles(UserRole.ADMIN)
 * @Roles(UserRole.LANDLORD)
 */
export const Roles = (...roles: UserRole[]) =>
  SetMetadata(ROLES_KEY, roles);