import Reveal from '../components/Reveal';
import FadeIn from '../components/FadeIn';
import { Plane, Train, Utensils, Shirt, HandHeart, Sparkles, Sun, Cloud } from 'lucide-react';

export default function Guide() {
  const sections = [
    {
      icon: Plane,
      eyebrow: 'Getting There',
      title: 'Approach with intention.',
      body: 'Braj lies 145 km south of Delhi. The gateway is Mathura Junction, one of India’s oldest railway stations, served by dozens of daily trains from Delhi (2h), Agra (1h), Mumbai and Kolkata. The Yamuna Expressway makes Delhi–Mathura a smooth three-hour drive. The nearest airports are Delhi (IGI, 3h) and Agra (Kheria, 1h). Once inside Braj, hire a car for the day, take a shared vikram for short hops, or—best of all—walk.',
    },
    {
      icon: Sun,
      eyebrow: 'When to Come',
      title: 'Seasons of Braj.',
      body: 'October to March is the softest—cool mornings, luminous afternoons, festivals stacked deep. Sharad Purnima (Oct), Diwali & Govardhan Puja (Oct–Nov), and Vasant Panchami (Feb) are moments the whole land turns golden. Holi in Barsana and Nandgaon (March) is legendary but hard-hitting; go with a guide. Monsoon (July–Sept) brings Hariyali and Jhulan—the season Krishna Himself preferred. Peak summer (May–June) is best avoided.',
    },
    {
      icon: Shirt,
      eyebrow: 'What to Wear',
      title: 'Modest, breathable, covered.',
      body: 'Braj is a temple town in soul. Cover shoulders and knees; carry a shawl or dupatta. Cotton kurtas, loose trousers, and slip-on sandals (you’ll take them off often) are ideal. For long parikramas, wear closed walking shoes. Modest saris or long dresses are welcomed and honoured in older mandirs. Leather (belts, wallets) may not be permitted inside some inner sanctums—carry a small cloth bag.',
    },
    {
      icon: HandHeart,
      eyebrow: 'Temple Etiquette',
      title: 'Enter with soft feet.',
      body: 'Silence phones before entering. Do not photograph deities without explicit permission. Circumambulate clockwise. Never point feet toward the altar or another person. Offer with the right hand. Sit on the floor when receiving prasad. In many Braj temples, women and men may enter separately—follow local sevaks. If uncertain, watch, then follow.',
    },
    {
      icon: Utensils,
      eyebrow: 'Braj Cuisine',
      title: 'A vegetarian devotion.',
      body: 'Onion and garlic are traditionally avoided across Braj kitchens. The food is a low, slow, ghee-rich vegetarian tradition centred on dairy: peda from Mathura, thandai from Vrindavan, kachori-sabzi at dawn, malpua and rabri at festival dusks. Do not miss chappan bhog on Govardhan Puja, and drink Yamuna-clay-water in unglazed matkas. Every meal begins with an offering.',
    },
    {
      icon: Sparkles,
      eyebrow: 'Sacred Vocabulary',
      title: 'Small words that open doors.',
      body: '“Radhe Radhe” is the universal Braj greeting—use it freely, from priest to rickshaw driver. “Jai Shri Krishna” works too. “Darshan” is not sightseeing; it is the exchange of gaze with the deity. “Seva” is not service; it is the smallest offering rendered as love. “Leela” is not myth; it is the divine play still happening in these fields.',
    },
    {
      icon: Train,
      eyebrow: 'Getting Around',
      title: 'Slow modes are sacred modes.',
      body: 'Between Mathura and Vrindavan (10 km), take an e-rickshaw or shared vikram. Between the outer villages—Barsana, Nandgaon, Govardhan—hire a car for the day (approx. ₹2,500–4,000). Inside Vrindavan’s old lanes, walk. Inside Barsana, climb. During Kartik and Purnima, the roads swell—start before dawn, return by dusk.',
    },
    {
      icon: Cloud,
      eyebrow: 'Where to Stay',
      title: 'From ashram to atelier.',
      body: 'Vrindavan holds most of the modern stays—from ISKCON’s guesthouses to heritage havelis like the Ananda Krishna Van. Mathura offers historic dharamshalas near Vishram Ghat and a handful of well-run four-star hotels. In Barsana and Nandgaon, stay in restored village houses or the sevak accommodations attached to the main temples. Book Kartik, Janmashtami and Holi 3–4 months in advance.',
    },
  ];

  return (
    <>
      <section className="bg-ink text-cream pt-28 pb-12">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="text-[11px] tracking-[0.35em] uppercase text-gold-2 mb-6">The Travel Guide</div>
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] max-w-5xl">
              Everything a first pilgrim <em className="italic text-gold-2">needs to know.</em>
            </h1>
            <p className="mt-8 font-serif text-lg text-cream/70 max-w-2xl leading-relaxed">
              The practical, the useful and the quietly essential—gathered from residents of Braj so that your first journey feels like your fifth.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-cream py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 space-y-24">
          {sections.map((s, i) => (
            <Reveal key={i} delay={i * 0.03}>
              <article className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-4">
                  <s.icon className="w-8 h-8 text-gold-3" />
                  <div className="text-[11px] tracking-[0.3em] uppercase text-gold-3 mt-6">{s.eyebrow}</div>
                  <h2 className="font-display text-4xl md:text-5xl mt-3 leading-[1.05] text-ink">{s.title}</h2>
                </div>
                <div className="lg:col-span-8">
                  <p className="font-serif text-lg md:text-xl text-ink/85 leading-[1.85]">{s.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
