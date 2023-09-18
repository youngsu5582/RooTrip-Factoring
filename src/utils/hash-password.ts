import { hashSync } from 'bcrypt';

export function hashPassword(password: string): string {
  const saltRound = 10;
  return hashSync(password, saltRound);
}
