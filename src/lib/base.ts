/** Prefix a public or API path with the `/braj` basename. */
export function withBase(path: string): string {
  if (!path || /^(https?:|data:|blob:)/.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (!path.startsWith('/')) return `${base}/${path}`;
  return `${base}${path}`;
}
