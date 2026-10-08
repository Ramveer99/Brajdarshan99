/** Static featured content when /api/* is unavailable in local dev. */
export type Destination = {
  slug: string;
  name: string;
  name_hi: string;
  tagline: string;
  hero_image: string;
  region: string;
  featured: boolean;
};

export type Experience = {
  slug: string;
  title: string;
  category: string;
  duration: string;
  location: string;
  description: string;
  image: string;
};

export type Article = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  cover_image: string;
  read_time: string;
  published_at: string;
};

export type Festival = {
  name: string;
  month: string;
  description: string;
  destination: string;
  image: string;
};

export const FEATURED_DESTINATIONS: Destination[] = [
  { slug: 'mathura', name: 'Mathura', name_hi: 'मथुरा', tagline: 'Where Krishna was born at midnight', hero_image: '/images/mathura.jpg', region: 'Central Braj', featured: true },
  { slug: 'vrindavan', name: 'Vrindavan', name_hi: 'वृन्दावन', tagline: 'The forest where every grove remembers a leela', hero_image: '/images/vrindavan.jpg', region: 'Eastern Braj', featured: true },
  { slug: 'barsana', name: 'Barsana', name_hi: 'बरसाना', tagline: 'Radha’s hill and the village of Her devotion', hero_image: '/images/barsana.jpg', region: 'Northern Braj', featured: true },
  { slug: 'nandgaon', name: 'Nandgaon', name_hi: 'नन्दगाँव', tagline: 'Home of Nand Baba and the cowherd clans', hero_image: '/images/nandgaon.jpg', region: 'Northern Braj', featured: true },
  { slug: 'govardhan', name: 'Govardhan', name_hi: 'गोवर्धन', tagline: 'The hill lifted on a single finger', hero_image: '/images/govardhan.jpg', region: 'Western Braj', featured: true },
  { slug: 'gokul', name: 'Gokul', name_hi: 'गोकुल', tagline: 'The cradle of Bala Krishna', hero_image: '/images/gokul.jpg', region: 'Eastern Braj', featured: true },
];

export const FEATURED_EXPERIENCES: Experience[] = [
  { slug: 'yamuna-aarti', title: 'Yamuna Aarti at Vishram Ghat', category: 'Ritual', duration: '2 hours', location: 'Mathura', description: 'Evening lamps on the river where Krishna rested.', image: '/images/aarti.jpg' },
  { slug: 'govardhan-parikrama', title: 'Govardhan Parikrama', category: 'Walk', duration: 'Full day', location: 'Govardhan', description: 'Circumambulate the sacred hill at dawn.', image: '/images/parikrama.jpg' },
  { slug: 'vrindavan-grove', title: 'Seva in a Vrindavan Grove', category: 'Seva', duration: '3 hours', location: 'Vrindavan', description: 'Quiet hours among tulsi and tamal trees.', image: '/images/peacock.jpg' },
  { slug: 'barsana-holi', title: 'Barsana Lathmar Holi', category: 'Festival', duration: '1 day', location: 'Barsana', description: 'Witness the playful festival of Radha’s village.', image: '/images/hero.jpg' },
];

export const FEATURED_ARTICLES: Article[] = [
  { slug: 'first-light-vrindavan', title: 'First Light in Vrindavan', category: 'Field Notes', excerpt: 'Before the bells ring, the ghats belong to the river and the tulsi sellers.', cover_image: '/images/aarti.jpg', read_time: '8 min', published_at: '2026-01-15' },
  { slug: 'govardhan-silence', title: 'The Silence of Govardhan', category: 'Essay', excerpt: 'On the hill where the sky was lifted, pilgrims still walk barefoot in gratitude.', cover_image: '/images/parikrama.jpg', read_time: '12 min', published_at: '2026-02-02' },
  { slug: 'barsana-memory', title: 'Memory in Barsana', category: 'Oral History', excerpt: 'Grandmothers on the hill recount Radha’s childhood as if it were yesterday.', cover_image: '/images/peacock.jpg', read_time: '10 min', published_at: '2026-02-20' },
];

export const FEATURED_FESTIVALS: Festival[] = [
  { name: 'Janmashtami', month: 'August', description: 'Midnight birth celebrations across Mathura and Vrindavan.', destination: 'Mathura', image: '/images/hero.jpg' },
  { name: 'Radhashtami', month: 'August–September', description: 'Barsana honours Radha with song and abhishek.', destination: 'Barsana', image: '/images/peacock.jpg' },
  { name: 'Govardhan Puja', month: 'October–November', description: 'Annakut offerings at the foot of the sacred hill.', destination: 'Govardhan', image: '/images/parikrama.jpg' },
  { name: 'Holi', month: 'March', description: 'Lathmar Holi in Barsana and the colours of Braj.', destination: 'Barsana', image: '/images/aarti.jpg' },
];
