import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { apiGet } from '../lib/api';
import ExperienceCard from '../components/ExperienceCard';
import Loading from '../components/Loading';
import FadeIn from '../components/FadeIn';
import { FEATURED_EXPERIENCES, type Experience } from '../data/fallbackContent';

export default function Experiences() {
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    apiGet<Experience[]>('/api/experiences')
      .then((data) => setItems(Array.isArray(data) && data.length ? data : FEATURED_EXPERIENCES))
      .catch(() => setItems(FEATURED_EXPERIENCES))
      .finally(() => setLoading(false));
  }, []);

  const cats = useMemo(() => ['All', ...Array.from(new Set(items.map((i) => i.category)))], [items]);
  const requested = params.get('category') || 'All';
  const cat = cats.includes(requested) ? requested : 'All';
  const filtered = cat === 'All' ? items : items.filter((i) => i.category === cat);
  const counts = useMemo(() => {
    const map = new Map<string, number>([['All', items.length]]);
    for (const item of items) map.set(item.category, (map.get(item.category) || 0) + 1);
    return map;
  }, [items]);

  function selectCategory(next: string) {
    if (next === 'All') setParams({});
    else setParams({ category: next });
  }

  return (
    <>
      <section className="bg-ink text-cream pt-28 pb-12">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="text-[11px] tracking-[0.35em] uppercase text-gold-2 mb-6">Curated Experiences</div>
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] max-w-5xl">
              Not sights. <em className="italic text-gold-2">Encounters.</em>
            </h1>
            <p className="mt-8 font-serif text-lg text-cream/70 max-w-2xl leading-relaxed">
              Each experience has been composed with a Braj-based scholar, priest, cook or classical artist. Move with them; move with the season; and Braj slowly opens.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-parchment paper-noise py-12">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className={`flex flex-wrap items-end justify-between gap-4 mb-10 ${loading ? 'invisible' : ''}`}>
            <div role="tablist" aria-label="Filter by kind of encounter" className="flex flex-wrap gap-2">
              {cats.map((c) => {
                const active = cat === c;
                return (
                  <button
                    key={c}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => selectCategory(c)}
                    className={`inline-flex items-center gap-2 px-4 h-10 text-[11px] tracking-[0.22em] uppercase border cursor-pointer transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${active ? 'bg-ink text-cream border-ink' : 'bg-cream/50 text-ink border-ink/20 hover:border-ink hover:bg-cream'} rounded-sm shadow-sm` }
                  >
                    {c}
                    <span className={`text-[10px] tracking-normal tabular-nums ${active ? 'text-gold-2' : 'text-ink-muted'}`}>
                      {counts.get(c) ?? 0}
                    </span>
                  </button>
                );
              })}
            </div>
            {!loading && (
              <p className="text-[11px] tracking-[0.22em] uppercase text-ink-muted" aria-live="polite">
                {filtered.length} {filtered.length === 1 ? 'encounter' : 'encounters'}
              </p>
            )}
          </div>
          {loading ? <Loading /> : (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.length === 0 ? (
                <p className="col-span-full font-serif text-lg text-ink-soft">Nothing in this category yet.</p>
              ) : filtered.map((e) => (
                <ExperienceCard key={e.slug} {...e} />
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
