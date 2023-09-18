import { PrismaClient } from '@prisma/client';
export class BasePrismaRepository extends PrismaClient {
  constructor() {
    super();
  }
}
