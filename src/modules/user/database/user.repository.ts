import { BasePrismaRepository } from '@src/libs/database/base-prisma-repository';
import UserRepositoryPort from './user.repository.port';
import { CreateLocalUserProps } from '../domain/user.type';

export class UserRepository
  extends BasePrismaRepository
  implements UserRepositoryPort
{
  constructor() {
    super();
  }
  async findByEmail(email: string): Promise<{ id: string } | null> {
    return await this.user.findUnique({
      where: { email },
      select: { id: true },
    });
  }
  async findByNickname(nickname: string): Promise<{ id: string } | null> {
    return await this.user.findUnique({
      where: { email: nickname },
      select: { id: true },
    });
  }
  async createLocalUserWithProfile(
    props: CreateLocalUserProps & { id: string },
  ): Promise<undefined> {
    const { bio, profileImage, name, ...createUserDto } = props;
    const createProfileDto = {
      bio,
      profileImage,
      name,
      userId: props.id,
    };
    delete createUserDto['metadata'];
    const profileId = (
      await this.profile.create({
        data: { ...createProfileDto },
        select: { id: true },
      })
    ).id;
    await this.user.create({ data: { ...createUserDto, profileId } });
    return;
  }
}
