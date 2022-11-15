import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
/**
 * decorator to skip Authentication on some APIs.
 */
export const SkipAuth = () => SetMetadata(IS_PUBLIC_KEY, true);
