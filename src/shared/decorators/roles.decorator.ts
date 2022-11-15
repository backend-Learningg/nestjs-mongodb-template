import { SetMetadata } from '@nestjs/common';
import { Role } from '../../common/constants';

export const ROLES_KEY = 'roles';

/**
 * decorator for applying roles guard on APIs.
 * @param roles list of allowed roles.
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
