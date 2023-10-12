export function isDevelopment() {
  if (!process.env.NODE_ENV) return true;
  return process.env.NODE_ENV === 'development';
}
