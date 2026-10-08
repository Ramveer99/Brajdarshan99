// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { ArrowRight, Compass, Sparkles, MapPin } from 'lucide-react';
// import Reveal from '../components/Reveal';
// import SectionHeading from '../components/SectionHeading';
// import DestinationCard from '../components/DestinationCard';
// import ExperienceCard from '../components/ExperienceCard';
// import BrajMap from '../components/BrajMap';
// import { apiGet } from '../lib/api';
// import {
//   FEATURED_DESTINATIONS,
//   FEATURED_EXPERIENCES,
//   FEATURED_ARTICLES,
//   FEATURED_FESTIVALS,
//   type Destination,
//   type Experience,
//   type Article,
//   type Festival,
// } from '../data/fallbackContent';

// const marqueeItems = [
//   '✧ Kartik Purnima at Vrindavan',
//   '✧ Radhashtami in Barsana',
//   '✧ Govardhan Annakut',
//   '✧ Yamuna Aarti at Vishram Ghat',
//   '✧ Holi in Barsana — Lathmar',
//   '✧ Janmashtami at Krishna Janmabhoomi',
//   '✧ Braj Chaurasi Kos Yatra',
//   '✧ Sharad Purnima Ras',
// ];

// export default function Home() {
//   const [destinations, setDestinations] = useState<Destination[]>([]);
//   const [experiences, setExperiences] = useState<Experience[]>([]);
//   const [articles, setArticles] = useState<Article[]>([]);
//   const [festivals, setFestivals] = useState<Festival[]>([]);
//   const [loadingDestinations, setLoadingDestinations] = useState(true);

//   useEffect(() => {
//     apiGet<Destination[]>('/api/destinations')
//       .then((d) => setDestinations(d.filter((x) => x.featured).slice(0, 6)))
//       .catch(() => setDestinations(FEATURED_DESTINATIONS))
//       .finally(() => setLoadingDestinations(false));
//     apiGet<Experience[]>('/api/experiences')
//       .then((d) => setExperiences(d.slice(0, 4)))
//       .catch(() => setExperiences(FEATURED_EXPERIENCES));
//     apiGet<Article[]>('/api/articles')
//       .then((d) => setArticles(d.slice(0, 3)))
//       .catch(() => setArticles(FEATURED_ARTICLES));
//     apiGet<Festival[]>('/api/festivals')
//       .then((d) => setFestivals(d.slice(0, 4)))
//       .catch(() => setFestivals(FEATURED_FESTIVALS));
//   }, []);

//   return (
//     <>
//       {/* Hero */}
//       <section className="relative h-screen min-h-[720px] w-full overflow-hidden text-cream">
//         <div className="absolute inset-0">
//           <img src="/images/hero.jpg" alt="Braj" className="w-full h-full object-cover" />
//           <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink/95" />
//           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0b1030_85%)]" />
//         </div>

//         <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col justify-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1.2, delay: 0.2 }}
//             className="font-devanagari text-gold-2 text-2xl md:text-3xl tracking-widest"
//           >
//             ब्रजभूमिः सर्वमंगलम्
//           </motion.div>

//           <motion.h1
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1.4, delay: 0.4 }}
//             className="mt-6 font-display text-6xl sm:text-7xl md:text-8xl lg:text-8xl leading-[0.95] tracking-[-0.02em]"
//           >
//             The Land Where <em className="font-serif italic text-gold-2">Krishna</em>
//             <br />
//             <span className="text-cream-strong">Still Walks.</span>
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1.2, delay: 0.8 }}
//             className="mt-8 max-w-2xl font-serif italic text-lg md:text-xl text-cream-soft leading-relaxed"
//           >
//             Across nine sacred forests, eighty-four kos, and five millennia of remembered song—
//             Braj Mandal is not a destination. It is a devotion you enter, and it enters you.
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1.2, delay: 1.1 }}
//             className="mt-10 flex flex-wrap items-center gap-4"
//           >
//             <Link to="/destinations" className="group inline-flex items-center gap-3 bg-gold text-ink px-8 h-14 text-ui tracking-[0.12em] font-medium hover:bg-cream transition">
//               Begin the darshan <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
//             </Link>
//             <Link to="/planner" className="btn-yatra group">
//               Plan your yatra <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
//             </Link>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1, delay: 1.6 }}
//             className="absolute bottom-10 left-6 lg:left-10 right-6 lg:right-10 flex items-end justify-between"
//           >
//             <div>
//               <div className="text-2xs tracking-[0.35em] uppercase text-cream/50 mb-2">Scroll to enter</div>
//               <div className="w-px h-14 bg-cream/40 scroll-cue"></div>
//             </div>
//             <div className="hidden md:flex items-end gap-10 text-cream-soft text-caption tracking-widest">
//               <div><span className="text-gold-2 font-serif text-2xl block">9</span>Sacred Forests</div>
//               <div><span className="text-gold-2 font-serif text-2xl block">84</span>Kos Parikrama</div>
//               <div><span className="text-gold-2 font-serif text-2xl block">5,000</span>Years of Bhakti</div>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Marquee */}
//       <div className="bg-ink text-gold-2 border-y border-cream/10 overflow-hidden py-4">
//         <div className="flex whitespace-nowrap marquee-track">
//           {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((t, i) => (
//             <span key={i} className="px-8 text-sm tracking-[0.25em] font-serif italic">{t}</span>
//           ))}
//         </div>
//       </div>

//       {/* Intro editorial */}
//       <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-28 md:py-40">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
//           <Reveal className="lg:col-span-5 lg:sticky lg:top-32">
//             <div className="text-caption tracking-[0.35em] uppercase text-gold-3 mb-6">A brief invocation</div>
//             <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.02] text-ink">
//               A geography <em className="italic text-gold-3">remembered</em> by love.
//             </h2>
//           </Reveal>
//           <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-7 space-y-6 text-lg leading-[1.9] text-ink-body font-serif">
//             <p className="text-xl md:text-2xl font-serif italic text-ink leading-snug">
//               Between the ochre bend of the Yamuna and the low hills of Govardhan, a hundred and fifty-three miles of soil have never forgotten the child who lived here.
//             </p>
//             <p>
//               Braj Mandal is a devotional landscape—a circle traced by the feet of pilgrims across five thousand years. Every grove has a story. Every well was drawn from. Every stone was sat upon. The villages of Mathura, Vrindavan, Barsana, Nandgaon, Govardhan, Kokilavan, Gokul, Baldeo and Raval are the fixed stars of a constellation still worshipped, still danced, still wept over.
//             </p>
//             <p>
//               This is not a tour. It is a doorway. Enter slowly.
//             </p>
//             <div className="pt-6 hair-divider"></div>
//             <div className="grid grid-cols-3 gap-6 pt-6">
//               {[
//                 { icon: Compass, label: 'Guided by scripture', v: 'From the Bhagavatam' },
//                 { icon: MapPin, label: 'Rooted in place', v: '9 principal sites' },
//                 { icon: Sparkles, label: 'Curated in reverence', v: 'By local acharyas' },
//               ].map((f, i) => (
//                 <div key={i} className="text-sm">
//                   <f.icon className="w-5 h-5 text-gold-3 mb-3" />
//                   <div className="text-ink font-medium not-italic font-sans">{f.v}</div>
//                   <div className="text-ink-muted text-caption mt-1 uppercase tracking-widest not-italic font-sans">{f.label}</div>
//                 </div>
//               ))}
//             </div>
//           </Reveal>
//         </div>
//       </section>

//       {/* Destinations */}
//       <section id="destinations" className="bg-parchment paper-noise py-12 md:py-16">
//         <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
//           <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10">
//             <Reveal className="max-w-3xl">
//               <SectionHeading
//                 eyebrow="The Nine Constellations of Braj"
//                 title={<>Places that have <em className="italic text-gold-3">held</em> the divine.</>}
//                 subtitle="Each destination is a chapter in one continuous devotional geography—walk them slowly, in the order love decides."
//               />
//             </Reveal>
//             <Link to="/destinations" className="section-link">
//               View all nine <ArrowRight className="w-4 h-4" aria-hidden="true" />
//             </Link>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {loadingDestinations
//               ? Array.from({ length: 6 }).map((_, i) => (
//                   <div key={i} className="aspect-[4/5] bg-ink/5 animate-pulse flex flex-col justify-end p-6" role="status" aria-busy="true" aria-label="Loading destinations">
//                     <span className="sr-only">Loading destinations…</span>
//                     <div className="h-3 w-16 bg-ink/10 rounded mb-2" aria-hidden="true" />
//                     <div className="h-6 w-3/4 bg-ink/10 rounded mb-2" aria-hidden="true" />
//                     <div className="h-4 w-full bg-ink/10 rounded" aria-hidden="true" />
//                   </div>
//                 ))
//               : destinations.map((d, i) => (
//                   <Reveal key={d.slug} delay={i * 0.08}>
//                     <DestinationCard
//                       slug={d.slug}
//                       name={d.name}
//                       nameHi={d.name_hi}
//                       tagline={d.tagline}
//                       image={d.hero_image}
//                       region={d.region}
//                       index={i}
//                     />
//                   </Reveal>
//                 ))}
//           </div>
//         </div>
//       </section>

//       {/* Interactive Map */}
//       <section className="bg-ink text-cream py-12 md:py-16">
//         <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
//             <Reveal className="lg:col-span-4">
//               <SectionHeading
//                 dark
//                 eyebrow="The Braj Mandal Circuit"
//                 title={<>The <em className="italic text-gold-2">Chaurasi Kos</em> in one glance.</>}
//                 subtitle="An eighty-four kos circumambulation binds Braj’s villages, hills and forests into one living circuit."
//               />
//               <div className="mt-10 space-y-3 text-sm text-cream-soft">
//                 <div className="flex items-center gap-3"><span className="w-8 h-px bg-gold"></span>Sacred site</div>
//                 <div className="flex items-center gap-3"><span className="w-8 border-t border-dashed border-gold"></span>Parikrama route</div>
//                 <div className="flex items-center gap-3"><span className="w-8 h-1 rounded bg-[#8ab6ff]"></span>Yamuna river</div>
//               </div>
//             </Reveal>
//             <div className="lg:col-span-8">
//               <Reveal delay={0.15}><BrajMap /></Reveal>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Experiences */}
//       <section className="bg-cream py-12 md:py-16">
//         <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
//           <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
//             <Reveal>
//               <SectionHeading
//                 eyebrow="Curated Experiences"
//                 title={<>Rituals, walks and <em className="italic text-gold-3">quiet hours.</em></>}
//                 subtitle="Not itineraries. Encounters. Each has been chosen with a local acharya, guide or scholar so that Braj is met on its own terms."
//               />
//             </Reveal>
//             <Link to="/experiences" className="section-link">
//               All experiences <ArrowRight className="w-4 h-4" aria-hidden="true" />
//             </Link>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {experiences.length === 0
//               ? Array.from({ length: 4 }).map((_, i) => (
//                   <div key={i} className="aspect-[3/4] bg-ink/5 animate-pulse" />
//                 ))
//               : experiences.map((e, i) => (
//                   <Reveal key={e.slug} delay={i * 0.06}>
//                     <ExperienceCard {...e} />
//                   </Reveal>
//                 ))}
//           </div>
//         </div>
//       </section>

//       {/* Quote block */}
//       <section className="relative py-32 md:py-44 bg-ink text-cream overflow-hidden">
//         <div className="absolute inset-0 opacity-30">
//           <img src="/images/peacock.jpg" alt="" className="w-full h-full object-cover" />
//           <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/40"></div>
//         </div>
//         <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 text-center">
//           <div className="font-devanagari text-gold-2 text-2xl mb-8">―― ✧ ――</div>
//           <p className="font-display text-3xl md:text-5xl leading-[1.15] text-cream italic">
//             “Vaikuntha is not superior to Vrindavan. There, in that forest of tulsi and tamal, God forgets he is God — and simply loves.”
//           </p>
//           <div className="mt-8 text-caption tracking-[0.35em] uppercase text-gold-2">― Chaitanya Charitamrita, Madhya-lila</div>
//         </div>
//       </section>

//       {/* Festivals */}
//       <section className="bg-parchment py-12 md:py-16">
//         <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
//           <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
//             <Reveal>
//               <SectionHeading
//                 eyebrow="The Utsav Calendar"
//                 title={<>A year of <em className="italic text-gold-3">festivals.</em></>}
//                 subtitle="The seasons in Braj are named for the God’s childhood. Plan your visit around them."
//               />
//             </Reveal>
//             <Link to="/festivals" className="section-link">
//               Full calendar <ArrowRight className="w-4 h-4" aria-hidden="true" />
//             </Link>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             {festivals.length === 0
//               ? Array.from({ length: 4 }).map((_, i) => <div key={i} className="aspect-[3/4] bg-ink/5 animate-pulse" />)
//               : festivals.map((f, i) => (
//                   <Reveal key={i} delay={i * 0.06}>
//                     <div className="relative aspect-[3/4] overflow-hidden group">
//                       <img src={f.image} alt={f.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
//                       <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/30 to-transparent"></div>
//                       <div className="absolute inset-0 p-6 flex flex-col justify-between text-cream">
//                         <div className="text-2xs tracking-[0.3em] uppercase text-gold-2">{f.month}</div>
//                         <div>
//                           <div className="font-serif text-2xl leading-tight">{f.name}</div>
//                           <div className="text-cream-soft text-caption mt-2">{f.destination}</div>
//                         </div>
//                       </div>
//                     </div>
//                   </Reveal>
//                 ))}
//           </div>
//         </div>
//       </section>

//       {/* Yatra planner CTA */}
//       <section className="bg-ink text-cream py-12 md:py-16">
//         <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-center">
//           <Reveal className="lg:col-span-6">
//             <div className="text-caption tracking-[0.35em] uppercase text-gold-2 mb-4">The Yatra Planner</div>
//             <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.02] text-cream">
//               A pilgrimage <em className="italic text-gold-2">shaped for you.</em>
//             </h2>
//             <p className="mt-6 font-serif text-lg text-cream-soft leading-relaxed max-w-lg">
//               Tell us your days, your temperament, and your intention. We compose a route that flows with the rhythm of morning aartis, riverside evenings and Braj’s slow, sacred quiet.
//             </p>
//             <Link to="/planner" className="btn-yatra mt-8 group">
//               Plan your yatra <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
//             </Link>
//           </Reveal>
//           <Reveal delay={0.15} className="lg:col-span-6">
//             <div className="grid grid-cols-2 gap-4">
//               <img src="/images/parikrama.jpg" alt="" className="aspect-[3/4] object-cover" />
//               <img src="/images/aarti.jpg" alt="" className="aspect-[3/4] object-cover translate-y-8" />
//             </div>
//           </Reveal>
//         </div>
//       </section>

//       {/* Journal */}
//       <section className="bg-cream py-12 md:py-16">
//         <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
//           <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
//             <Reveal>
//               <SectionHeading
//                 eyebrow="The Braj Journal"
//                 title={<>Long reads from the <em className="italic text-gold-3">field.</em></>}
//                 subtitle="Slow essays, oral histories and quiet notes gathered from ghats, groves and grandmothers."
//               />
//             </Reveal>
//             <Link to="/journal" className="section-link">
//               The full archive <ArrowRight className="w-4 h-4" aria-hidden="true" />
//             </Link>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {articles.length === 0
//               ? Array.from({ length: 3 }).map((_, i) => <div key={i} className="aspect-[3/4] bg-ink/5 animate-pulse" />)
//               : articles.map((a, i) => (
//                   <Reveal key={a.slug} delay={i * 0.08}>
//                     <Link to={`/journal/${a.slug}`} className="group block">
//                       <div className="aspect-[3/4] overflow-hidden bg-ink/5">
//                         <img src={a.cover_image} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
//                       </div>
//                       <div className="pt-5">
//                         <div className="text-2xs tracking-[0.3em] uppercase text-gold-3 mb-3">{a.category} · {a.read_time}</div>
//                         <h3 className="font-serif text-xl md:text-2xl text-ink leading-snug group-hover:text-gold-3 transition">{a.title}</h3>
//                         <p className="mt-3 text-ink-soft text-sm leading-relaxed line-clamp-3">{a.excerpt}</p>
//                       </div>
//                     </Link>
//                   </Reveal>
//                 ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }



import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronDown, Compass, Sparkles, MapPin } from 'lucide-react';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import DestinationCard from '../components/DestinationCard';
import ExperienceCard from '../components/ExperienceCard';
import BrajMap from '../components/BrajMap';
import { apiGet } from '../lib/api';
import { withBase } from '../lib/base';
import {
  FEATURED_DESTINATIONS,
  FEATURED_EXPERIENCES,
  FEATURED_ARTICLES,
  FEATURED_FESTIVALS,
  type Destination,
  type Experience,
  type Article,
  type Festival,
} from '../data/fallbackContent';

const marqueeItems = [
  '✧ Kartik Purnima at Vrindavan',
  '✧ Radhashtami in Barsana',
  '✧ Govardhan Annakut',
  '✧ Yamuna Aarti at Vishram Ghat',
  '✧ Holi in Barsana — Lathmar',
  '✧ Janmashtami at Krishna Janmabhoomi',
  '✧ Braj Chaurasi Kos Yatra',
  '✧ Sharad Purnima Ras',
];

export default function Home() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loadingDestinations, setLoadingDestinations] = useState(true);

  useEffect(() => {
    apiGet<Destination[]>('/api/destinations')
      .then((d) => setDestinations(d.filter((x) => x.featured).slice(0, 6)))
      .catch(() => setDestinations(FEATURED_DESTINATIONS))
      .finally(() => setLoadingDestinations(false));

    apiGet<Experience[]>('/api/experiences')
      .then((d) => setExperiences(d.slice(0, 4)))
      .catch(() => setExperiences(FEATURED_EXPERIENCES));

    apiGet<Article[]>('/api/articles')
      .then((d) => setArticles(d.slice(0, 3)))
      .catch(() => setArticles(FEATURED_ARTICLES));

    apiGet<Festival[]>('/api/festivals')
      .then((d) => setFestivals(d.slice(0, 4)))
      .catch(() => setFestivals(FEATURED_FESTIVALS));
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[100svh] w-full overflow-hidden text-cream flex flex-col">
        <div className="absolute inset-0">
          <img
            src={withBase('/images/hero.jpg')}
            alt="Braj"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink/95" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0b1030_85%)]" />
        </div>

        <div className="relative z-10 flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col justify-center [justify-content:safe_center] gap-8 sm:gap-10 pt-28 sm:pt-32 pb-8 sm:pb-10">
          <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="font-devanagari text-gold-2 text-xl sm:text-2xl md:text-3xl tracking-wide sm:tracking-widest"
          >
            ब्रजभूमिः सर्वमंगलम्
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.4 }}
            className="mt-6 font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-[-0.02em]"
          >
            The Land Where{' '}
            <em className="font-serif italic text-gold-2">Krishna</em>
            <br />
            <span className="text-cream-strong">Still Walks.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="mt-8 max-w-2xl font-serif italic text-lg md:text-xl text-cream-soft leading-relaxed"
          >
            Across nine sacred forests, eighty-four kos, and five millennia of
            remembered song—Braj Mandal is not a destination. It is a devotion
            you enter, and it enters you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.1 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/destinations"
              className="group inline-flex items-center justify-center gap-3 bg-gold text-ink px-6 sm:px-8 h-12 sm:h-14 text-ui tracking-[0.12em] font-medium hover:bg-cream transition w-full sm:w-auto"
            >
              Begin the darshan
              <ArrowRight
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </Link>

            <Link to="/planner" className="btn-yatra group">
              Plan your yatra
              <ArrowRight
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </Link>
          </motion.div>

          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="shrink-0 flex items-end justify-between gap-4"
          >
            <div aria-hidden="true" className="flex flex-col items-start">
              <div className="text-caption tracking-[0.35em] uppercase text-cream-soft mb-2">
                Scroll to enter
              </div>
              <div className="flex flex-col items-center scroll-cue">
                <div className="w-px h-10 bg-cream-soft" />
                <ChevronDown className="w-4 h-4 text-cream-soft" strokeWidth={1.5} />
              </div>
            </div>

            <div className="hidden md:flex items-end gap-10 text-cream-soft text-caption tracking-widest">
              <div>
                <span className="text-gold-2 font-serif text-2xl block">9</span>
                Sacred Forests
              </div>
              <div>
                <span className="text-gold-2 font-serif text-2xl block">84</span>
                Kos Parikrama
              </div>
              <div>
                <span className="text-gold-2 font-serif text-2xl block">
                  5,000
                </span>
                Years of Bhakti
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-ink text-gold-2 border-y border-cream/10 overflow-hidden py-4">
        <div className="flex whitespace-nowrap marquee-track">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((t, i) => (
            <span
              key={i}
              className="px-8 text-body-sm tracking-[0.25em] font-serif italic"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Intro editorial */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14 md:py-16">
        <div className="text-caption tracking-[0.35em] uppercase text-gold-3 mb-6">
          A brief invocation
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <Reveal className="lg:col-span-5 lg:sticky lg:top-32">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.02] text-ink">
              A geography <em className="italic text-gold-3">remembered</em>{' '}
              by love.
            </h2>
          </Reveal>

          <Reveal
            delay={0.1}
            className="lg:col-span-7 lg:col-start-7 space-y-6 text-lg leading-[1.9] text-ink-body font-serif"
          >
            <p className="text-xl md:text-2xl font-serif italic text-ink leading-snug">
              Between the ochre bend of the Yamuna and the low hills of
              Govardhan, a hundred and fifty-three miles of soil have never
              forgotten the child who lived here.
            </p>

            <p>
              Braj Mandal is a devotional landscape—a circle traced by the
              feet of pilgrims across five thousand years. Every grove has a
              story. Every well was drawn from. Every stone was sat upon. The
              villages of Mathura, Vrindavan, Barsana, Nandgaon, Govardhan,
              Kokilavan, Gokul, Baldeo and Raval are the fixed stars of a
              constellation still worshipped, still danced, still wept over.
            </p>

            <p>This is not a tour. It is a doorway. Enter slowly.</p>

            <div className="pt-6 hair-divider"></div>

            <div className="grid grid-cols-1 min-[420px]:grid-cols-3 gap-6 pt-6">
              {[
                {
                  icon: Compass,
                  label: 'Guided by scripture',
                  v: 'From the Bhagavatam',
                },
                {
                  icon: MapPin,
                  label: 'Rooted in place',
                  v: '9 principal sites',
                },
                {
                  icon: Sparkles,
                  label: 'Curated in reverence',
                  v: 'By local acharyas',
                },
              ].map((f, i) => (
                <div key={i} className="text-body-sm">
                  <f.icon
                    className="w-5 h-5 text-gold-3 mb-3"
                    aria-hidden="true"
                  />
                  <div className="text-ink font-medium not-italic font-sans">
                    {f.v}
                  </div>
                  <div className="text-ink-muted text-caption mt-1 uppercase tracking-widest not-italic font-sans">
                    {f.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Destinations */}
      <section
        id="destinations"
        className="bg-parchment paper-noise py-12 md:py-16"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          {/* FIX: Keep heading and View All action visually connected */}
          <div className="mb-10">
            <Reveal className="max-w-3xl">
              <SectionHeading
                eyebrow="The Nine Constellations of Braj"
                title={
                  <>
                    Places that have{' '}
                    <em className="italic text-gold-3">held</em> the divine.
                  </>
                }
                subtitle="Each destination is a chapter in one continuous devotional geography—walk them slowly, in the order love decides."
              />

              <Link
                to="/destinations"
                className="section-link mt-6 inline-flex items-center gap-2"
                aria-label="View all nine destinations"
              >
                View all nine
                <ArrowUpRight
                  className="w-4 h-4"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadingDestinations
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[4/5] bg-ink/5 animate-pulse flex flex-col justify-end p-6"
                    role="status"
                    aria-busy="true"
                    aria-label="Loading destinations"
                  >
                    <span className="sr-only">
                      Loading destinations…
                    </span>
                    <div
                      className="h-3 w-16 bg-ink/10 rounded mb-2"
                      aria-hidden="true"
                    />
                    <div
                      className="h-6 w-3/4 bg-ink/10 rounded mb-2"
                      aria-hidden="true"
                    />
                    <div
                      className="h-4 w-full bg-ink/10 rounded"
                      aria-hidden="true"
                    />
                  </div>
                ))
              : destinations.map((d, i) => (
                  <Reveal key={d.slug} delay={i * 0.08}>
                    <DestinationCard
                      slug={d.slug}
                      name={d.name}
                      nameHi={d.name_hi}
                      tagline={d.tagline}
                      image={d.hero_image}
                      region={d.region}
                      index={i}
                    />
                  </Reveal>
                ))}
          </div>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="bg-ink text-cream py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <Reveal className="lg:col-span-4 mt-8">
              <SectionHeading
                dark
                eyebrow="The Braj Mandal Circuit"
                title={
                  <>
                    The <em className="italic text-gold-2">Chaurasi Kos</em>{' '}
                    in one glance.
                  </>
                }
                subtitle="An eighty-four kos circumambulation binds Braj’s villages, hills and forests into one living circuit."
              />

              <div className="mt-10 space-y-3 text-body-sm text-cream-soft">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 shrink-0 rounded-full bg-gold" aria-hidden="true"></span>
                  Sacred site
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-8 border-t border-dashed border-gold"></span>
                  Parikrama route
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-8 h-1 rounded bg-river"></span>
                  Yamuna river
                </div>
              </div>
            </Reveal>

            <div className="lg:col-span-8">
              <Reveal delay={0.15}>
                <BrajMap />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Experiences */}
      <section className="bg-cream py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="mb-16">
            <Reveal className="max-w-3xl">
              <SectionHeading
                eyebrow="Curated Experiences"
                title={
                  <>
                    Rituals, walks and{' '}
                    <em className="italic text-gold-3">quiet hours.</em>
                  </>
                }
                subtitle="Not itineraries. Encounters. Each has been chosen with a local acharya, guide or scholar so that Braj is met on its own terms."
              />

              <Link to="/experiences" className="section-link mt-6 inline-flex items-center gap-2">
                All experiences
                <ArrowUpRight
                  className="w-4 h-4"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {experiences.length === 0
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[3/4] bg-ink/5 animate-pulse"
                  />
                ))
              : experiences.map((e, i) => (
                  <Reveal key={e.slug} delay={i * 0.06}>
                    <ExperienceCard {...e} />
                  </Reveal>
                ))}
          </div>
        </div>
      </section>

      {/* Quote block */}
      <section className="relative py-14 md:py-20 bg-ink text-cream overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img
            src={withBase('/images/peacock.jpg')}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/40"></div>
        </div>

        <Reveal className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <div className="font-devanagari text-gold-2 text-2xl mb-8">
            ―― ✧ ――
          </div>

          <p className="font-display text-3xl md:text-5xl leading-[1.15] text-cream italic">
            “Vaikuntha is not superior to Vrindavan. There, in that forest of
            tulsi and tamal, God forgets he is God — and simply loves.”
          </p>

          <div className="mt-8 text-caption tracking-[0.35em] uppercase text-gold-2">
            ― Chaitanya Charitamrita, Madhya-lila
          </div>
        </Reveal>
      </section>

      {/* Festivals */}
      <section className="bg-parchment py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
            <Reveal>
              <SectionHeading
                eyebrow="The Utsav Calendar"
                title={
                  <>
                    A year of{' '}
                    <em className="italic text-gold-3">festivals.</em>
                  </>
                }
                subtitle="The seasons in Braj are named for the God’s childhood. Plan your visit around them."
              />
            </Reveal>

            <Link to="/festivals" className="section-link">
              Full calendar
              <ArrowUpRight
                className="w-4 h-4"
                aria-hidden="true"
              />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {festivals.length === 0
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[3/4] bg-ink/5 animate-pulse"
                  />
                ))
              : festivals.map((f, i) => (
                  <Reveal key={i} delay={i * 0.06}>
                    <div className="relative aspect-[3/4] overflow-hidden group">
                      <img
                        src={withBase(f.image)}
                        alt={f.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/30 to-transparent"></div>

                      <div className="absolute inset-0 p-6 flex flex-col justify-between text-cream">
                        <div className="text-2xs tracking-[0.3em] uppercase text-gold-2">
                          {f.month}
                        </div>

                        <div>
                          <div className="font-serif text-2xl leading-tight">
                            {f.name}
                          </div>

                          <div className="text-cream-soft text-caption mt-2">
                            {f.destination}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
          </div>
        </div>
      </section>

      {/* Yatra planner CTA */}
      <section className="bg-ink text-cream py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-6">
            <div className="text-caption tracking-[0.35em] uppercase text-gold-2 mb-4">
              The Yatra Planner
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.02] text-cream">
              A pilgrimage <em className="italic text-gold-2">shaped for you.</em>
            </h2>

            <p className="mt-6 font-serif text-lg text-cream-soft leading-relaxed max-w-lg">
              Tell us your days, your temperament, and your intention. We
              compose a route that flows with the rhythm of morning aartis,
              riverside evenings and Braj’s slow, sacred quiet.
            </p>

            <Link to="/planner" className="btn-yatra mt-8 group">
              Plan your yatra
              <ArrowRight
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </Link>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              <img
                src={withBase('/images/parikrama.jpg')}
                alt=""
                className="aspect-[3/4] object-cover"
              />

              <img
                src={withBase('/images/aarti.jpg')}
                alt=""
                className="aspect-[3/4] object-cover translate-y-8"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Journal */}
      <section className="bg-cream py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
            <Reveal>
              <SectionHeading
                eyebrow="The Braj Journal"
                title={
                  <>
                    Long reads from the{' '}
                    <em className="italic text-gold-3">field.</em>
                  </>
                }
                subtitle="Slow essays, oral histories and quiet notes gathered from ghats, groves and grandmothers."
              />
            </Reveal>

            <Link to="/journal" className="section-link">
              The full archive
              <ArrowUpRight
                className="w-4 h-4"
                aria-hidden="true"
              />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.length === 0
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[3/4] bg-ink/5 animate-pulse"
                  />
                ))
              : articles.map((a, i) => (
                  <Reveal key={a.slug} delay={i * 0.08}>
                    <Link
                      to={`/journal/${a.slug}`}
                      className="group block"
                    >
                      <div className="aspect-[3/4] overflow-hidden bg-ink/5">
                        <img
                          src={withBase(a.cover_image)}
                          alt={a.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>

                      <div className="pt-5">
                        <div className="text-2xs tracking-[0.3em] uppercase text-gold-3 mb-3">
                          {a.category} · {a.read_time}
                        </div>

                        <h3 className="font-serif text-xl md:text-2xl text-ink leading-snug group-hover:text-gold-3 transition">
                          {a.title}
                        </h3>

                        <p className="mt-3 text-ink-soft text-body-sm leading-relaxed line-clamp-3">
                          {a.excerpt}
                        </p>
                      </div>
                    </Link>
                  </Reveal>
                ))}
          </div>
        </div>
      </section>
    </>
  );
}
