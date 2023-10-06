import { Profile, User } from '@prisma/client';

export type CreateLocalUserProps = Pick<
  User,
  'email' | 'password' | 'nickname'
> &
  Pick<Profile, 'bio' | 'profileImage' | 'name'>;

export type UserProps = Pick<User, 'email' | 'password' | 'nickname'>;

export type VerificationUserCodeProps = {
  code: string;
};
