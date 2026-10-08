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

export type DestinationPage = Destination & {
  deity: string;
  description: string;
  story: string;
  best_time: string;
  how_to_reach: string;
  gallery: string[];
  highlights: string[];
};

export const DESTINATION_PAGES: DestinationPage[] = [
  {
    slug: 'mathura',
    name: 'Mathura',
    name_hi: 'मथुरा',
    tagline: 'Where Krishna was born at midnight',
    hero_image: '/images/mathura.jpg',
    region: 'Central Braj',
    featured: true,
    deity: 'Krishna',
    description: 'The birthplace on the Yamuna, where the prison of Kansa became the first temple of Braj.',
    story: 'Mathura is the city Krishna entered the world. At midnight in the month of Bhadra, in a locked chamber of Kansa’s prison, Devaki gave birth and the guards slept.\n\nVishram Ghat is where He rested after slaying Kansa. The lanes around Dwarkadhish and the Janmabhoomi still fill at dawn with sankirtan, and the river keeps the same bend the cowherds knew.',
    best_time: 'October to March, and Janmashtami',
    how_to_reach: 'Mathura Junction is on the Delhi–Agra line. The old city and Vishram Ghat are a short ride from the station.',
    gallery: ['/images/mathura.jpg', '/images/aarti.jpg', '/images/hero.jpg', '/images/parikrama.jpg'],
    highlights: ['Shri Krishna Janmabhoomi', 'Dwarkadhish Temple', 'Vishram Ghat aarti', 'A walk along the Yamuna at dusk'],
  },
  {
    slug: 'vrindavan',
    name: 'Vrindavan',
    name_hi: 'वृन्दावन',
    tagline: 'The forest where every grove remembers a leela',
    hero_image: '/images/vrindavan.jpg',
    region: 'Eastern Braj',
    featured: true,
    deity: 'Radha-Krishna',
    description: 'The forest of Vrinda, now a town of temples, still arranged around the groves of the leelas.',
    story: 'Vrindavan is where Krishna’s youth unfolded among the groves. Banke Bihari, Radha Raman and the sandy bank of Keshi Ghat keep the hours of that forest.\n\nCome before the first bell. The tulsi sellers are already on the lane, and the Yamuna is still the colour of unpolished brass.',
    best_time: 'October to March; Kartik is the fullest month',
    how_to_reach: 'About 15 kilometres from Mathura. E-rickshaws run the parikrama and the temple lanes.',
    gallery: ['/images/vrindavan.jpg', '/images/peacock.jpg', '/images/aarti.jpg', '/images/kirtan.jpg'],
    highlights: ['Banke Bihari Temple', 'Keshi Ghat at sunrise', 'Seva Kunj in the evening', 'Nidhivan after the gates close'],
  },
  {
    slug: 'barsana',
    name: 'Barsana',
    name_hi: 'बरसाना',
    tagline: 'Radha’s hill and the village of Her devotion',
    hero_image: '/images/barsana.jpg',
    region: 'Northern Braj',
    featured: true,
    deity: 'Radha',
    description: 'Radha’s village, set on a ridge above the Braj plain, where Lathmar Holi is still played in the lanes.',
    story: 'Barsana is Radha’s home. The Ladli Lal temple crowns the hill, and the path up is lined with the stories grandmothers still tell as if they happened last season.\n\nIn Phalgun the village plays Lathmar Holi. For the rest of the year it is quieter: wind, peacocks, and the view back toward Nandgaon.',
    best_time: 'October to March, and Holi',
    how_to_reach: 'About 50 kilometres north of Mathura. Shared jeeps and taxis run from the city.',
    gallery: ['/images/barsana.jpg', '/images/peacock.jpg', '/images/hero.jpg', '/images/nandgaon.jpg'],
    highlights: ['Radha Rani Temple on the hill', 'Lathmar Holi lanes', 'The ridge view toward Nandgaon'],
  },
  {
    slug: 'nandgaon',
    name: 'Nandgaon',
    name_hi: 'नन्दगाँव',
    tagline: 'Home of Nand Baba and the cowherd clans',
    hero_image: '/images/nandgaon.jpg',
    region: 'Northern Braj',
    featured: true,
    deity: 'Nand Baba and Krishna',
    description: 'The village of Nand and Yashoda, on the hill facing Barsana across the plain.',
    story: 'Nandgaon is where Krishna grew up in Nand Baba’s house. The temple on the hill faces Barsana, and the two villages still answer each other at Holi.\n\nThe climb is short. From the top the fields run unbroken toward Radha’s ridge.',
    best_time: 'October to March',
    how_to_reach: 'A few kilometres from Barsana, about 55 kilometres from Mathura.',
    gallery: ['/images/nandgaon.jpg', '/images/barsana.jpg', '/images/peacock.jpg', '/images/hero.jpg'],
    highlights: ['Nand Bhavan', 'The hill facing Barsana', 'Holi between the two villages'],
  },
  {
    slug: 'govardhan',
    name: 'Govardhan',
    name_hi: 'गोवर्धन',
    tagline: 'The hill lifted on a single finger',
    hero_image: '/images/govardhan.jpg',
    region: 'Western Braj',
    featured: true,
    deity: 'Giriraj',
    description: 'The sacred hill Krishna lifted, still walked barefoot by pilgrims on the parikrama.',
    story: 'Govardhan is the hill itself. When Indra sent the storm, Krishna lifted Giriraj on a finger and the village stood beneath it.\n\nThe parikrama is still done on foot, often before dawn. Offerings of milk and sweets are left on the stones, and the path is quiet enough to hear your own steps.',
    best_time: 'October to March; Govardhan Puja in Kartik',
    how_to_reach: 'About 25 kilometres from Mathura. Start the walk from any of the ghats along the hill.',
    gallery: ['/images/govardhan.jpg', '/images/parikrama.jpg', '/images/hero.jpg', '/images/peacock.jpg'],
    highlights: ['Govardhan parikrama', 'Daan Ghati', 'Kusum Sarovar at first light'],
  },
  {
    slug: 'gokul',
    name: 'Gokul',
    name_hi: 'गोकुल',
    tagline: 'The cradle of Bala Krishna',
    hero_image: '/images/gokul.jpg',
    region: 'Eastern Braj',
    featured: true,
    deity: 'Bala Krishna',
    description: 'The village across the Yamuna where Yashoda raised the infant Krishna.',
    story: 'Gokul is the cradle. Vasudeva carried the newborn across the Yamuna in the rain, and this is where the child grew until the family moved to Nandgaon.\n\nThe lanes are small and the temples keep the mood of a household rather than a court.',
    best_time: 'October to March',
    how_to_reach: 'Across the river from Mathura, a short drive or boat from the ghats.',
    gallery: ['/images/gokul.jpg', '/images/aarti.jpg', '/images/mathura.jpg', '/images/hero.jpg'],
    highlights: ['Thakurani Ghat', 'The lanes of the infant leelas', 'A morning on the far bank of the Yamuna'],
  },
  {
    slug: 'kokilavan',
    name: 'Kokilavan',
    name_hi: 'कोकिलावन',
    tagline: 'Shani’s peacock grove',
    hero_image: '/images/kokilavan.jpg',
    region: 'Eastern Braj',
    featured: true,
    deity: 'Shani',
    description: 'A grove on the edge of Braj, known for the Shani temple among the trees.',
    story: 'Kokilavan sits slightly apart from the Krishna villages. Pilgrims come for Shani, and the grove still feels like the edge of the forest rather than a town.\n\nPeacocks cross the paths in the late afternoon. It is an easy stop between Mathura and the eastern villages.',
    best_time: 'October to March',
    how_to_reach: 'East of Mathura, on the road toward the inner Braj villages.',
    gallery: ['/images/kokilavan.jpg', '/images/peacock.jpg', '/images/hero.jpg', '/images/gokul.jpg'],
    highlights: ['Shani temple', 'The grove at dusk', 'Peacocks along the paths'],
  },
  {
    slug: 'baldeo',
    name: 'Baldeo',
    name_hi: 'बलदेव',
    tagline: 'The elder brother’s abode',
    hero_image: '/images/baldeo.jpg',
    region: 'Eastern Braj',
    featured: true,
    deity: 'Balram',
    description: 'The town of Krishna’s elder brother, Balram, on the Mathura–Gokul side of Braj.',
    story: 'Baldeo belongs to Balram. The temple here honours the elder brother who held the plough and stood beside Krishna through the leelas of Braj.\n\nIt is a working temple town: bells, prasad, and a slower pace than Mathura’s ghats.',
    best_time: 'October to March',
    how_to_reach: 'A short drive east of Mathura, on the way toward Gokul.',
    gallery: ['/images/baldeo.jpg', '/images/gokul.jpg', '/images/mathura.jpg', '/images/hero.jpg'],
    highlights: ['Dauji Maharaj temple', 'A quieter stop between Mathura and Gokul'],
  },
  {
    slug: 'raval',
    name: 'Raval',
    name_hi: 'रावल',
    tagline: 'Birthplace of Radha',
    hero_image: '/images/raval.jpg',
    region: 'Northern Braj',
    featured: true,
    deity: 'Radha',
    description: 'The village where Radha was born, small and still set among fields.',
    story: 'Raval is Radha’s birthplace, before Barsana became her home. The village is modest, and that is part of its pull: a lane, a temple, and fields that have not been built over.\n\nMost visitors pair it with Barsana on the same morning.',
    best_time: 'October to March',
    how_to_reach: 'Near Barsana, north of Mathura. Taxis usually combine it with the Barsana hill.',
    gallery: ['/images/raval.jpg', '/images/barsana.jpg', '/images/peacock.jpg', '/images/hero.jpg'],
    highlights: ['Radha’s birth temple', 'A combined morning with Barsana'],
  },
];

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
