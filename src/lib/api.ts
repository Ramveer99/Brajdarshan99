/**
 * API routes live at the host root (`/api/...`).
 * Prefixing the SPA base (for example `/braj`) makes the static host
 * answer with index.html instead of JSON.
 */
function apiUrl(path: string): string {
  if (/^(https?:)?\/\//.test(path)) return path;
  return path.startsWith('/') ? path : `/${path}`;
}

async function readJson<T>(res: Response): Promise<T> {
  const text = await res.text();
  const trimmed = text.trimStart();
  if (!res.ok || trimmed.startsWith('<')) {
    throw new Error(trimmed.startsWith('<') ? 'API returned HTML' : `Request failed: ${res.status}`);
  }
  return JSON.parse(text) as T;
}

export async function apiGet<T = any>(path: string): Promise<T> {
  const res = await fetch(apiUrl(path));
  return readJson<T>(res);
}

export async function apiPost<T = any>(path: string, body: any): Promise<T> {
  const res = await fetch(apiUrl(path), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  });
  return readJson<T>(res);
}
