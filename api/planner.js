import supabase from './db-client.js';

const ROUTES = {
  mathura: ['Mathura', 'Vrindavan', 'Gokul', 'Govardhan', 'Barsana', 'Nandgaon', 'Kokilavan', 'Baldeo', 'Raval'],
  vrindavan: ['Vrindavan', 'Mathura', 'Gokul', 'Govardhan', 'Barsana', 'Nandgaon', 'Kokilavan', 'Baldeo', 'Raval'],
  barsana: ['Barsana', 'Nandgaon', 'Kokilavan', 'Vrindavan', 'Mathura', 'Govardhan', 'Gokul', 'Baldeo', 'Raval'],
  gokul: ['Gokul', 'Mathura', 'Vrindavan', 'Govardhan', 'Barsana', 'Nandgaon', 'Baldeo', 'Raval', 'Kokilavan'],
  govardhan: ['Govardhan', 'Barsana', 'Nandgaon', 'Vrindavan', 'Mathura', 'Gokul', 'Kokilavan', 'Baldeo', 'Raval'],
  nandgaon: ['Nandgaon', 'Barsana', 'Kokilavan', 'Vrindavan', 'Mathura', 'Govardhan', 'Gokul', 'Baldeo', 'Raval'],
  kokilavan: ['Kokilavan', 'Barsana', 'Nandgaon', 'Vrindavan', 'Mathura', 'Govardhan', 'Gokul', 'Baldeo', 'Raval'],
  baldeo: ['Baldeo', 'Gokul', 'Raval', 'Mathura', 'Vrindavan', 'Govardhan', 'Barsana', 'Nandgaon', 'Kokilavan'],
  raval: ['Raval', 'Gokul', 'Baldeo', 'Mathura', 'Vrindavan', 'Govardhan', 'Barsana', 'Nandgaon', 'Kokilavan'],
};

const NARRATIVES = {
  Mathura: {
    morning: 'Dawn darshan at Shri Krishna Janmabhoomi; walk the sacred prakaram in silence.',
    afternoon: 'Explore Dwarkadhish Temple and the old lanes of Chowk Bazaar; taste warm peda.',
    evening: 'Yamuna aarti at Vishram Ghat as sixty lamps meet the water.',
    note: 'Mathura is the city where the story begins — arrive with reverence, not haste.',
  },
  Vrindavan: {
    morning: 'Mangala aarti at Banke Bihari; then a quiet visit to Radharaman.',
    afternoon: 'Nidhivan’s tulsi grove and Prem Mandir’s marble courtyards.',
    evening: 'Kirtan at ISKCON, followed by a walk along Keshi Ghat under starlight.',
    note: 'Vrindavan is best experienced on foot; the lanes are the leela.',
  },
  Barsana: {
    morning: 'Climb the 200 steps to Shriji Temple as the pilgrims sing Radhe Radhe.',
    afternoon: 'Visit Mor Kutir and the sakhi ghats around Sanket.',
    evening: 'Sunset from Brahma Parvat with a saffron sky.',
    note: 'Barsana is Radha’s land — walk here with softer feet than anywhere else.',
  },
  Nandgaon: {
    morning: 'Nand Bhavan darshan and the wells where Krishna bathed as a child.',
    afternoon: 'Explore the ashta-sakhas’ shrines and hidden kunds in the hills.',
    evening: 'Sit atop Nandishwar Hill and watch the plains soften into gold.',
    note: 'This was the village Krishna called home; every stone remembers a boyhood.',
  },
  Govardhan: {
    morning: 'Begin the 21 km Govardhan parikrama at Manasi Ganga, barefoot if you can.',
    afternoon: 'Break at Radha Kund and Shyam Kund; visit Kusum Sarovar.',
    evening: 'Aarti at Danghati Temple as bhaktas complete their round.',
    note: 'Govardhan is the mountain that God lifted; walk around it, and it lifts you.',
  },
  Kokilavan: {
    morning: 'Peacock-filled dawn at the Shani Dev temple grove.',
    afternoon: 'Wander the tamarind forests where Krishna’s flute is said to still be heard.',
    evening: 'Prasad and quiet at the ashram — an ideal night away from crowds.',
    note: 'The only forest in Braj where Shani Dev is worshipped as a friend of Krishna.',
  },
  Gokul: {
    morning: 'Nand Bhavan and Chaurasi Khamba temple — the cradle of Bala Krishna.',
    afternoon: 'Yamuna boat ride to Raman Reti — sand where the child once played.',
    evening: 'Evening kirtan at Gokulnath temple.',
    note: 'Gokul is where the infant leelas unfolded; the air still feels like a lullaby.',
  },
  Baldeo: {
    morning: 'Darshan of Dauji at Baldeo Mandir — the elder brother’s only major temple in Braj.',
    afternoon: 'Visit Kshira Sagar and the old wrestling akhadas of Balaram.',
    evening: 'Village walk and a quiet dinner of pure Braj thali.',
    note: 'A temple where the deity is said to have appeared from the earth itself.',
  },
  Raval: {
    morning: 'Sunrise darshan at the temple of Radha’s birth.',
    afternoon: 'Cross the Yamuna on foot; visit lesser-known shrines around Chir Ghat.',
    evening: 'Return via Mathura; peda and rest.',
    note: 'Small, quiet, and rarely visited — yet the very cradle of the eternal Beloved.',
  },
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'POST') {
      const { days = 3, start = 'mathura', pilgrimType = 'devotional', interests = [] } = req.body || {};
      // Optional touch: log request row for analytics if a table exists
      try { await supabase.from('planner_requests').insert({ days, start, pilgrim_type: pilgrimType, interests }); } catch {}

      const order = ROUTES[start] || ROUTES.mathura;
      const clampedDays = Math.max(1, Math.min(9, Number(days) || 3));
      const stops = order.slice(0, clampedDays);
      const plan = stops.map((name, i) => {
        const n = NARRATIVES[name];
        let note = n.note;
        if (pilgrimType === 'contemplative') note += ' Skip crowded morning aartis; favour the ghats after 4pm.';
        if (pilgrimType === 'family') note += ' Keep pace gentle; carry water and shade.';
        if (pilgrimType === 'heritage') note += ' A local scholar can be arranged for the afternoon walk.';
        return { day: i + 1, destination: name, morning: n.morning, afternoon: n.afternoon, evening: n.evening, note };
      });

      return res.status(200).json({ plan });
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
