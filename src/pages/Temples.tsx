import { useEffect, useMemo, useState } from 'react';
import { apiGet } from '../lib/api';
import TempleCard from '../components/TempleCard';
import Loading from '../components/Loading';
import Reveal from '../components/Reveal';

type T = { slug: string; name: string; name_hi: string; deity: string; destination_slug: string; image: string };
type D = { slug: string; name: string };

export default function Temples() {
  const [items, setItems] = useState<T[]>([]);
  const [dests, setDests] = useState<D[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    Promise.all([apiGet<T[]>('/api/temples'), apiGet<D[]>('/api/destinations')])
      .then(([t, d]) => { setItems(t); setDests(d); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const destMap = useMemo(() => Object.fromEntries(dests.map((d) => [d.slug, d.name])), [dests]);
  const options = useMemo(() => ['All', ...dests.map((d) => d.name)], [dests]);
  const filtered = filter === 'All' ? items : items.filter((i) => destMap[i.destination_slug] === filter);

  return (
    <>
      <section className="bg-ink text-cream pt-40 pb-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-[11px] tracking-[0.35em] uppercase text-gold-2 mb-6">Mandirs of Braj</div>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] max-w-4xl">
            Doorways of <em className="italic text-gold-2">darshan</em>.
          </h1>
          <p className="mt-8 font-serif text-lg text-cream/70 max-w-2xl leading-relaxed">
            From Krishna Janmabhoomi in Mathura to the deep silence of Radharaman in Vrindavan—the temples of Braj range from vast pilgrimage complexes to hidden courtyards behind narrow lanes. Each is worth its own morning.
          </p>
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap gap-2 mb-10">
            {options.map((o) => (
              <button key={o} onClick={() => setFilter(o)} className={`px-4 h-10 text-[11px] tracking-[0.22em] uppercase border transition ${filter === o ? 'bg-ink text-cream border-ink' : 'border-ink/20 hover:border-ink'}`}>{o}</button>
            ))}
          </div>
          {loading ? <Loading /> : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((t, i) => (
                <Reveal key={t.slug} delay={i * 0.03}>
                  <TempleCard {...t} destination={destMap[t.destination_slug] || ''} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
