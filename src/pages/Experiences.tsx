import { useEffect, useMemo, useState } from 'react';
import { apiGet } from '../lib/api';
import ExperienceCard from '../components/ExperienceCard';
import Loading from '../components/Loading';
import Reveal from '../components/Reveal';
import { FEATURED_EXPERIENCES, type Experience } from '../data/fallbackContent';

export default function Experiences() {
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState('All');

  useEffect(() => {
    apiGet<Experience[]>('/api/experiences')
      .then(setItems)
      .catch(() => setItems(FEATURED_EXPERIENCES))
      .finally(() => setLoading(false));
  }, []);

  const cats = useMemo(() => ['All', ...Array.from(new Set(items.map((i) => i.category)))], [items]);
  const filtered = cat === 'All' ? items : items.filter((i) => i.category === cat);

  return (
    <>
      <section className="bg-ink text-cream pt-40 pb-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-[11px] tracking-[0.35em] uppercase text-gold-2 mb-6">Curated Experiences</div>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] max-w-5xl">
            Not sights. <em className="italic text-gold-2">Encounters.</em>
          </h1>
          <p className="mt-8 font-serif text-lg text-cream/70 max-w-2xl leading-relaxed">
            Each experience has been composed with a Braj-based scholar, priest, cook or classical artist. Move with them; move with the season; and Braj slowly opens.
          </p>
        </div>
      </section>

      <section className="bg-parchment paper-noise py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap gap-2 mb-10">
            {cats.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`px-4 h-10 text-[11px] tracking-[0.22em] uppercase border transition ${cat === c ? 'bg-ink text-cream border-ink' : 'border-ink/20 hover:border-ink'}`}>{c}</button>
            ))}
          </div>
          {loading ? <Loading /> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((e, i) => (
                <Reveal key={e.slug} delay={i * 0.04}><ExperienceCard {...e} /></Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
