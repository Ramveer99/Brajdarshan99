import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { slug, destination } = req.query;
      if (slug) {
        const { data, error } = await supabase.from('temples').select('*').eq('slug', slug).single();
        if (error) throw error;
        return res.status(200).json(data);
      }
      let q = supabase.from('temples').select('*').order('id', { ascending: true });
      if (destination) q = q.eq('destination_slug', destination);
      const { data, error } = await q;
      if (error) throw error;
      return res.status(200).json(data);
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
