import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiGet } from '../lib/api';
import { withBase } from '../lib/base';
import Loading from '../components/Loading';
import Reveal from '../components/Reveal';
import TempleCard from '../components/TempleCard';
import { Calendar, MapPin, Clock, Compass, ArrowRight, ArrowLeft } from 'lucide-react';
import { DESTINATION_PAGES, FEATURED_EXPERIENCES } from '../data/fallbackContent';

type D = {
  slug: string; name: string; name_hi: string; tagline: string; hero_image: string;
  story: string; description: string; best_time: string; how_to_reach: string;
  deity: string; region: string; gallery: string[]; highlights: string[];
};
type T = { slug: string; name: string; name_hi: string; deity: string; destination_slug: string; image: string };
type E = { slug: string; title: string; category: string; duration: string; location: string; description: string; image: string };

export default function DestinationDetail() {
  const { slug } = useParams();
  const [d, setD] = useState<D | null>(null);
  const [temples, setTemples] = useState<T[]>([]);
  const [experiences, setExperiences] = useState<E[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true); setError(false);
    Promise.all([
      apiGet<D>(`/api/destinations?slug=${slug}`),
      apiGet<T[]>(`/api/temples?destination=${slug}`),
      apiGet<E[]>(`/api/experiences?location=${slug}`),
    ])
      .then(([dest, t, e]) => { setD(dest); setTemples(t); setExperiences(e); })
      .catch(() => {
        const local = DESTINATION_PAGES.find((item) => item.slug === slug);
        if (!local) {
          setError(true);
          return;
        }
        setD(local);
        setTemples([]);
        setExperiences(
          FEATURED_EXPERIENCES.filter((item) => item.location.toLowerCase() === local.name.toLowerCase()),
        );
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="pt-40"><Loading /></div>;
  if (error || !d) return (
    <div className="pt-40 text-center px-6">
      <div className="text-ink/60">This destination could not be found.</div>
      <Link to="/destinations" className="inline-flex items-center gap-2 mt-6 text-gold-3"><ArrowLeft className="w-4 h-4" /> Back to destinations</Link>
    </div>
  );

  return (
    <>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden text-cream">
        <img src={withBase(d.hero_image)} alt={d.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/30 to-ink" />
        <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col justify-end pb-20">
          <Link to="/destinations" className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-cream/70 hover:text-gold-2 mb-6">
            <ArrowLeft className="w-4 h-4" /> All Destinations
          </Link>
          <div className="font-devanagari text-3xl md:text-4xl text-gold-2 mb-4">{d.name_hi}</div>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-[-0.02em]">{d.name}</h1>
          <p className="mt-6 font-serif italic text-xl md:text-2xl text-cream/85 max-w-2xl">{d.tagline}</p>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl text-sm">
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-gold-2">Presiding</div>
              <div className="mt-1 font-serif text-lg">{d.deity}</div>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-gold-2">Region</div>
              <div className="mt-1 font-serif text-lg">{d.region}</div>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-gold-2">Best Season</div>
              <div className="mt-1 font-serif text-lg">{d.best_time}</div>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-gold-2">Sanctity</div>
              <div className="mt-1 font-serif text-lg">One of nine Vans</div>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-cream py-28 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-14">
          <Reveal className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
            <div className="text-[11px] tracking-[0.35em] uppercase text-gold-3 mb-5">The Story</div>
            <h2 className="font-display text-5xl md:text-6xl leading-[1.02] text-ink">
              Why <em className="italic text-gold-3">{d.name}</em> matters.
            </h2>
            <p className="mt-8 font-serif text-lg text-ink/70 italic">{d.description}</p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7 space-y-6 font-serif text-lg text-ink/85 leading-[1.9]">
            {d.story.split('\n\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {d.highlights && d.highlights.length > 0 && (
              <div className="mt-10 border-t border-ink/10 pt-8">
                <div className="text-[11px] tracking-[0.3em] uppercase text-gold-3 mb-5">What awaits you</div>
                <ul className="space-y-4">
                  {d.highlights.map((h, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="text-gold-3 font-serif text-2xl leading-none">·</span>
                      <span className="text-ink/80 not-italic font-sans text-base leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      {d.gallery && d.gallery.length > 0 && (
        <section className="bg-parchment paper-noise py-20">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {d.gallery.map((g, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <div className={`overflow-hidden ${i % 3 === 0 ? 'aspect-[3/4]' : 'aspect-square'}`}>
                    <img src={withBase(g)} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Temples */}
      {temples.length > 0 && (
        <section className="bg-cream py-28 md:py-36">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="mb-12">
              <div className="text-[11px] tracking-[0.35em] uppercase text-gold-3 mb-4">Principal Temples</div>
              <h2 className="font-display text-4xl md:text-5xl text-ink">The mandirs of <em className="italic text-gold-3">{d.name}</em></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {temples.map((t) => (
                <TempleCard key={t.slug} {...t} destination={d.name} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Practical info */}
      <section className="bg-ink text-cream py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Reveal>
              <Calendar className="w-6 h-6 text-gold-2 mb-4" />
              <div className="text-[10px] tracking-[0.3em] uppercase text-gold-2 mb-2">Best time to visit</div>
              <h3 className="font-serif text-2xl leading-snug">{d.best_time}</h3>
            </Reveal>
            <Reveal delay={0.1}>
              <Compass className="w-6 h-6 text-gold-2 mb-4" />
              <div className="text-[10px] tracking-[0.3em] uppercase text-gold-2 mb-2">How to reach</div>
              <p className="font-serif text-lg leading-relaxed text-cream/85">{d.how_to_reach}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <Clock className="w-6 h-6 text-gold-2 mb-4" />
              <div className="text-[10px] tracking-[0.3em] uppercase text-gold-2 mb-2">Suggested stay</div>
              <p className="font-serif text-lg leading-relaxed text-cream/85">2–4 days, unhurried. Braj rewards the slow visitor.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Experiences */}
      {experiences.length > 0 && (
        <section className="bg-cream py-28">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="mb-12">
              <div className="text-[11px] tracking-[0.35em] uppercase text-gold-3 mb-4">Local Experiences</div>
              <h2 className="font-display text-4xl md:text-5xl text-ink">Encounters in <em className="italic text-gold-3">{d.name}</em></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experiences.map((e) => (
                <div key={e.slug} className="bg-parchment paper-noise p-6">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-gold-3 mb-3">{e.category}</div>
                  <h3 className="font-serif text-2xl text-ink">{e.title}</h3>
                  <p className="mt-3 text-ink/70 text-sm leading-relaxed">{e.description}</p>
                  <div className="mt-4 pt-4 border-t border-ink/10 text-xs text-ink/60 flex justify-between">
                    <span><Clock className="w-3.5 h-3.5 inline mr-1" /> {e.duration}</span>
                    <span><MapPin className="w-3.5 h-3.5 inline mr-1" /> {e.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-parchment py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="text-[11px] tracking-[0.3em] uppercase text-gold-3 mb-3">Continue the Darshan</div>
            <h3 className="font-display text-3xl md:text-4xl text-ink">Explore another sacred village of Braj.</h3>
          </div>
          <Link to="/destinations" className="inline-flex items-center gap-3 bg-ink text-cream px-8 h-14 text-[12px] tracking-[0.25em] uppercase hover:bg-gold-3 transition">
            All destinations <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
