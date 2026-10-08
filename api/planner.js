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

const TEMPLES = {
  Mathura: [
    { name: 'Krishna Janmabhoomi', hours: '5:00–12:00 · 4:00–9:30', aarti: 'Mangala 5:15 · Sandhya 7:00' },
    { name: 'Dwarkadhish', hours: '6:30–11:00 · 4:30–8:30', aarti: 'Mangala 7:00 · Shayan 8:00' },
    { name: 'Vishram Ghat', hours: 'The ghat stays open', aarti: 'Yamuna aarti 6:30' },
  ],
  Vrindavan: [
    { name: 'Banke Bihari', hours: '8:00–12:00 · 5:30–9:30', aarti: 'Shrine closes at midday for rajbhog' },
    { name: 'Radha Raman', hours: '8:00–12:00 · 5:30–8:00', aarti: 'Mangala 5:00 · Sandhya 7:15' },
    { name: 'ISKCON', hours: '7:15–12:45 · 4:00–8:15', aarti: 'Mangala 4:30 · Gaura aarti 6:30' },
    { name: 'Prem Mandir', hours: '8:30–12:00 · 4:30–8:30', aarti: 'Fountain show after dusk' },
  ],
  Barsana: [
    { name: 'Shriji Temple', hours: '6:00–12:00 · 4:00–8:00', aarti: 'Mangala 5:30 · Sandhya 7:00' },
    { name: 'Maan Mandir', hours: '6:30–12:00 · 3:30–7:00', aarti: 'Darshan through the day' },
  ],
  Nandgaon: [
    { name: 'Nand Bhavan', hours: '6:00–12:00 · 3:00–7:00', aarti: 'Mangala 6:00 · Sandhya 6:30' },
    { name: 'Nandishwar Hill', hours: 'Open with the village', aarti: 'Best light after 4:00' },
  ],
  Govardhan: [
    { name: 'Daan Ghati', hours: '6:00–12:00 · 4:00–8:00', aarti: 'Sandhya aarti 6:30' },
    { name: 'Manasi Ganga', hours: 'The kund is open', aarti: 'Begin the walk by 6:00' },
    { name: 'Kusum Sarovar', hours: 'Sunrise to dusk', aarti: 'Quietest before 8:00' },
  ],
  Kokilavan: [
    { name: 'Shani Dev Temple', hours: '6:00–12:00 · 2:00–8:00', aarti: 'Sandhya 6:30' },
  ],
  Gokul: [
    { name: 'Nand Bhavan', hours: '6:00–12:00 · 4:00–8:00', aarti: 'Mangala 6:00' },
    { name: 'Chaurasi Khamba', hours: '6:30–11:30 · 4:00–7:30', aarti: 'Sandhya 6:30' },
  ],
  Baldeo: [
    { name: 'Dauji Maharaj', hours: '6:00–12:00 · 4:00–9:00', aarti: 'Mangala 6:00 · Sandhya 7:00' },
  ],
  Raval: [
    { name: 'Radha Janmasthan', hours: '6:00–12:00 · 3:00–7:00', aarti: 'Mangala 6:15 · Sandhya 6:30' },
  ],
};

const NARRATIVES = {
  Mathura: {
    morning: 'Dawn darshan at Shri Krishna Janmabhoomi; walk the sacred prakaram in silence.',
    afternoon: 'Dwarkadhish Temple, then the old lanes of Chowk Bazaar and Holi Gate.',
    evening: 'Yamuna aarti at Vishram Ghat as the lamps meet the water.',
    note: 'Mathura is the city where the story begins — arrive with reverence, not haste.',
    stay: 'A guesthouse above the lanes near Vishram Ghat or Holi Gate, so the evening aarti is a short walk.',
    breakfast: 'Warm peda and milk at Brijwasi, or jalebi with chai just off Holi Gate.',
    lunch: 'A sattvic Braj thali near Dwarkadhish — keep it light before the afternoon lanes.',
    dinner: 'Khichdi or a small thali after aarti. Kitchens around the ghats close early.',
    places: ['Krishna Janmabhoomi', 'Dwarkadhish', 'Vishram Ghat', 'Potara Kund', 'Kans Qila'],
    before: 'Shoes come off well before the prakaram. The shortest darshan queue is before 7am.',
  },
  Vrindavan: {
    morning: 'Mangala aarti at Banke Bihari, then a quiet hour at Radharaman.',
    afternoon: 'Nidhivan’s tulsi grove, Seva Kunj, and Prem Mandir’s marble courtyards.',
    evening: 'Kirtan at ISKCON, then a walk along Keshi Ghat under starlight.',
    note: 'Vrindavan is best experienced on foot; the lanes are the leela.',
    stay: 'Loi Bazaar or a lane room a short walk from Banke Bihari. ISKCON’s guest house suits a quieter night.',
    breakfast: 'Kachori, jalebi and chai on Loi Bazaar — eat before the lanes fill.',
    lunch: 'Sattvic thali at Govinda’s, or a simple meal near Radha Raman.',
    dinner: 'An early supper. Most temple kitchens expect you fed before the evening kirtan.',
    places: ['Banke Bihari', 'Radha Raman', 'Nidhivan', 'Seva Kunj', 'Keshi Ghat', 'Prem Mandir'],
    before: 'Banke Bihari closes through the day for rajbhog. Plan the second visit around the shutters.',
  },
  Barsana: {
    morning: 'Climb to Shriji Temple as the pilgrims sing Radhe Radhe.',
    afternoon: 'Mor Kutir, Maan Mandir, and the sakhi shrines toward Sanket.',
    evening: 'Sunset from the ridge, looking across the plain to Nandgaon.',
    note: 'Barsana is Radha’s land — walk here with softer feet than anywhere else.',
    stay: 'A room in the bazaar below the hill. Climb once, in the cool hours, and come down before dark.',
    breakfast: 'Poha, chai and a Radhe Radhe from the stalls at the foot of the steps.',
    lunch: 'A village thali in Barsana bazaar after you descend.',
    dinner: 'An early meal. Few kitchens stay open once the hill goes quiet.',
    places: ['Shriji Temple', 'Maan Mandir', 'Mor Kutir', 'Sanket', 'The ridge toward Nandgaon'],
    before: 'The steps are steep and often bare stone. Carry water; the wind on the ridge is stronger than it looks.',
  },
  Nandgaon: {
    morning: 'Nand Bhavan darshan and the wells of Krishna’s childhood.',
    afternoon: 'The ashta-sakha shrines and the kunds in the folds of the hill.',
    evening: 'Sit on Nandishwar Hill and watch the plain soften toward Barsana.',
    note: 'This was the village Krishna called home; every stone remembers a boyhood.',
    stay: 'A small guesthouse facing the fields, or the night in Barsana if you prefer a larger bazaar.',
    breakfast: 'Fresh peda and milk near Nand Bhavan — the village morning is short and sweet.',
    lunch: 'Braj thali in the bazaar below the hill.',
    dinner: 'A quiet supper before the light goes. The path down is kinder in daylight.',
    places: ['Nand Bhavan', 'Nandishwar Hill', 'Pavan Sarovar', 'The view to Barsana'],
    before: 'Pair this day with Barsana if you can. The two hills still answer each other across the plain.',
  },
  Govardhan: {
    morning: 'Begin the parikrama at Manasi Ganga, barefoot if you can.',
    afternoon: 'Rest at Radha Kund and Shyam Kund, then Kusum Sarovar.',
    evening: 'Aarti at Daan Ghati as the day’s walkers close their round.',
    note: 'Govardhan is the mountain that God lifted; walk around it, and it lifts you.',
    stay: 'A room at Manasi Ganga or Radha Kund, so the walk begins at your door.',
    breakfast: 'Chai and mathri before you set out. Eat light — the circuit is long.',
    lunch: 'A simple meal at Radha Kund, where most pilgrims break the walk.',
    dinner: 'Thali in Govardhan town once the feet are washed.',
    places: ['Manasi Ganga', 'Daan Ghati', 'Radha Kund', 'Kusum Sarovar', 'Punchari'],
    before: 'The full parikrama is about 21 km. Carry water. A shorter day still honours Daan Ghati and the kunds.',
  },
  Kokilavan: {
    morning: 'Dawn among the peacocks at the Shani Dev temple grove.',
    afternoon: 'The tamarind paths where the flute is still said to be heard.',
    evening: 'Prasad and quiet — the stillest night on this route.',
    note: 'A grove on the edge of Braj, where Shani is worshipped as a friend of Krishna.',
    stay: 'An ashram or grove-side room. This is the night to leave the temple towns behind.',
    breakfast: 'Simple ashram fare, or chai under the trees if the kitchen is late.',
    lunch: 'A prasad-style meal near the temple — rice, sabzi, and quiet.',
    dinner: 'An early supper at the ashram. There is little else open after dusk.',
    places: ['Shani Dev temple', 'The peacock paths', 'Tamarind grove'],
    before: 'Come for the trees as much as the temple. Late afternoon is when the peacocks cross the paths.',
  },
  Gokul: {
    morning: 'Nand Bhavan and Chaurasi Khamba — the cradle of Bala Krishna.',
    afternoon: 'A boat to Raman Reti, the sand where the child once played.',
    evening: 'Kirtan at the Gokulnath temple as the lanes grow small and warm.',
    note: 'Gokul is where the infant leelas unfolded; the air still feels like a lullaby.',
    stay: 'A room near Thakurani Ghat, or return to Mathura if you want a larger kitchen street.',
    breakfast: 'Milk and peda. A Gokul morning is meant to stay light.',
    lunch: 'A household thali in the lanes — dal, roti, and a spoon of ghee.',
    dinner: 'Kirtan first, then khichdi. The village eats early.',
    places: ['Nand Bhavan', 'Chaurasi Khamba', 'Raman Reti', 'Thakurani Ghat'],
    before: 'The lanes are household-narrow. An e-rickshaw to the ghat, then walk.',
  },
  Baldeo: {
    morning: 'Darshan of Dauji — the elder brother’s great temple in Braj.',
    afternoon: 'Kshira Sagar and the old wrestling grounds of Balaram.',
    evening: 'A slow village walk as the bells thin out.',
    note: 'A working temple town, slower than Mathura’s ghats, devoted to Balram.',
    stay: 'The temple guesthouse near Dauji, or a night back in Mathura.',
    breakfast: 'Kachori and chai in the temple bazaar before darshan.',
    lunch: 'A full Braj thali once the morning queue has eased.',
    dinner: 'The village thali — the honest meal this town is known for.',
    places: ['Dauji Maharaj', 'Kshira Sagar', 'The old akhadas'],
    before: 'Dauji’s morning darshan draws a steady local crowd. Arrive with the first bells.',
  },
  Raval: {
    morning: 'Sunrise darshan at the temple of Radha’s birth.',
    afternoon: 'The fields around the village, and Chir Ghat if the river is kind.',
    evening: 'Return to your base while the light still holds.',
    note: 'Small, quiet, and rarely visited — the cradle of the eternal Beloved.',
    stay: 'Few rooms here. Sleep in Barsana or Mathura and come for the morning.',
    breakfast: 'Eat before you leave your base. Raval offers tea stalls, not a breakfast street.',
    lunch: 'Carry water and fruit. Take a proper thali in Barsana on the way back.',
    dinner: 'Back at your base, after the drive.',
    places: ['Radha’s birth temple', 'The unbuilt fields', 'Chir Ghat'],
    before: 'Most pilgrims pair Raval with Barsana on one morning. Do not plan a long afternoon here.',
  },
};

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

/** Analytics only. Must not load or block the itinerary when Supabase is unset. */
function recordRequest(row) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return;
  import('./db-client.js')
    .then((mod) => mod.default.from('planner_requests').insert(row))
    .catch(() => {});
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'POST') {
      const { days = 3, start = 'mathura', pilgrimType = 'devotional', interests = [] } = readBody(req.body);
      recordRequest({ days, start, pilgrim_type: pilgrimType, interests });

      const order = ROUTES[start] || ROUTES.mathura;
      const clampedDays = Math.max(1, Math.min(9, Number(days) || 3));
      const stops = order.slice(0, clampedDays);
      const plan = stops.map((name, i) => {
        const n = NARRATIVES[name];
        let note = n.note;
        let stay = n.stay;
        if (pilgrimType === 'contemplative') {
          note += ' Skip crowded morning aartis; favour the ghats after 4pm.';
          stay += ' Ask for the quieter end of the lane, away from the main gate.';
        }
        if (pilgrimType === 'family') {
          note += ' Keep pace gentle; carry water and shade.';
          stay += ' A ground-floor room and a place to rest at midday will matter more than proximity.';
        }
        if (pilgrimType === 'heritage') note += ' A local scholar can be arranged for the afternoon walk.';
        return {
          day: i + 1,
          destination: name,
          morning: n.morning,
          afternoon: n.afternoon,
          evening: n.evening,
          note,
          stay,
          breakfast: n.breakfast,
          lunch: n.lunch,
          dinner: n.dinner,
          places: n.places,
          before: n.before,
          temples: TEMPLES[name] || [],
        };
      });

      return res.status(200).json({ plan });
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
