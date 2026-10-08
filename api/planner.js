import { composePlan } from '../src/lib/composeYatra.js';

function readBody(body) {
  if (body == null) return {};
  if (typeof body === 'string') {
    try { return JSON.parse(body); } catch { return {}; }
  }
  if (Buffer.isBuffer(body)) {
    try { return JSON.parse(body.toString('utf8')); } catch { return {}; }
  }
  return body;
}

const JSON_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

/** Analytics only. Must not load or block the itinerary when Supabase is unset. */
function recordRequest(row) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return;
  import('./db-client.js')
    .then((mod) => mod.default.from('planner_requests').insert(row))
    .catch(() => {});
}

function payloadFrom(body) {
  const { days = 3, start = 'mathura', pilgrimType = 'devotional', interests = [] } = readBody(body);
  return { days, start, pilgrimType, interests };
}

export default async function handler(req, res) {
  // Some hosts call the function with a Fetch Request and expect a Response.
  // Using the Node res object there throws, and the host answers with an HTML error page.
  const isWeb = req && typeof req.headers?.get === 'function' && (!res || typeof res.status !== 'function');
  if (isWeb) {
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: JSON_HEADERS });
    if (req.method !== 'POST' && req.method !== 'GET') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: JSON_HEADERS });
    }
    const input = req.method === 'GET'
      ? payloadFrom(Object.fromEntries(new URL(req.url).searchParams))
      : payloadFrom(await req.json().catch(() => ({})));
    recordRequest({ days: input.days, start: input.start, pilgrim_type: input.pilgrimType, interests: input.interests });
    return new Response(JSON.stringify({ plan: composePlan(input) }), { status: 200, headers: JSON_HEADERS });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET' || req.method === 'POST') {
      const input = payloadFrom(req.method === 'GET' ? req.query : req.body);
      recordRequest({ days: input.days, start: input.start, pilgrim_type: input.pilgrimType, interests: input.interests });
      return res.status(200).json({ plan: composePlan(input) });
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
