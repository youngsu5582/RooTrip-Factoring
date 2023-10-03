import { randomBytes } from 'crypto';

export function randomCode(length = 16): string {
  const buffer = randomBytes(length);
  return buffer.toString('hex');
}
