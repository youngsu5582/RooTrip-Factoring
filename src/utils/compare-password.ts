import { compareSync } from 'bcrypt';
export function comparePassword(plain: string, hashed: string) {
  return compareSync(plain, hashed);
}
