import { BasePrismaRepository } from '@src/libs/database/base-prisma-repository';
import UserRepositoryPort from './user.repository.port';

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
}
