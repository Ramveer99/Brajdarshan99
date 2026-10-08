import path from 'node:path';
import { pathToFileURL } from 'node:url';

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks).toString()));
    req.on('error', reject);
  });
}

function createVercelResponse(res) {
  let statusCode = 200;
  const headers = {};

  const response = {
    setHeader(key, value) {
      headers[key] = value;
      return response;
    },
    status(code) {
      statusCode = code;
      return response;
    },
    json(data) {
      for (const [key, value] of Object.entries(headers)) res.setHeader(key, value);
      res.statusCode = statusCode;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
      return response;
    },
    end() {
      for (const [key, value] of Object.entries(headers)) res.setHeader(key, value);
      res.statusCode = statusCode;
      res.end();
      return response;
    },
  };

  return response;
}

export function apiDevPlugin(envVars = {}) {
  return {
    name: 'vercel-api-dev',
    configureServer(server) {
      Object.assign(process.env, envVars);

      server.middlewares.use(async (req, res, next) => {
        let rawUrl = req.url || '';
        // App is served under /braj, so API calls arrive as /braj/api/...
        if (rawUrl === '/braj' || rawUrl.startsWith('/braj/')) {
          rawUrl = rawUrl.slice('/braj'.length) || '/';
        }
        if (!rawUrl.startsWith('/api/')) return next();

        const [pathname, queryString = ''] = rawUrl.split('?');
        const route = pathname.slice('/api/'.length);
        if (!route || route.includes('/') || route.includes('..')) return next();

        const apiFile = path.resolve(process.cwd(), 'api', `${route}.js`);

        try {
          const mod = await import(`${pathToFileURL(apiFile).href}?t=${Date.now()}`);
          const handler = mod.default;
          if (typeof handler !== 'function') return next();

          const query = {};
          for (const [key, value] of new URLSearchParams(queryString)) {
            if (query[key] === undefined) query[key] = value;
            else if (Array.isArray(query[key])) query[key].push(value);
            else query[key] = [query[key], value];
          }

          let body;
          if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
            const raw = await readBody(req);
            if (raw) {
              try {
                body = JSON.parse(raw);
              } catch {
                body = raw;
              }
            }
          }

          await handler({ method: req.method, query, body }, createVercelResponse(res));
        } catch (err) {
          console.error(`[api-dev] ${pathname}:`, err);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message }));
          }
        }
      });
    },
  };
}
