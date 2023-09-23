import { hashSync } from 'bcrypt';

export function hashingPassword(password: string): string {
  const saltRound = 10;
  return hashSync(password, saltRound);
}
