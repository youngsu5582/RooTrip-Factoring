import { CreateLocalUserProps } from '../domain/user.type';

export default interface UserRepositoryPort {
  findByEmail: (email: string) => Promise<{ id: string } | null>;
  findByNickname: (nickname: string) => Promise<{ id: string } | null>;
  createLocalUserWithProfile: (
    props: CreateLocalUserProps,
  ) => Promise<undefined>;
}
