import { useEffect, useState } from 'react';
import { apiGet } from '../lib/api';
import { withBase } from '../lib/base';
import Loading from '../components/Loading';
import Reveal from '../components/Reveal';
import { Route, Clock, Mountain } from 'lucide-react';
import RouteTimeline from '../components/RouteTimeline';

type R = { slug: string; name: string; duration_days: number; description: string; difficulty: string; stops: string[]; image: string; category: string };

export default function RoutesPage() {
  const [items, setItems] = useState<R[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { apiGet<R[]>('/api/routes').then(setItems).catch(() => {}).finally(() => setLoading(false)); }, []);

  return (
    <>
      <section className="bg-ink text-cream pt-40 pb-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-[11px] tracking-[0.35em] uppercase text-gold-2 mb-6">Pilgrimage Routes</div>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] max-w-5xl">
            The old <em className="italic text-gold-2">parikramas.</em>
          </h1>
          <p className="mt-8 font-serif text-lg text-cream/70 max-w-2xl leading-relaxed">
            To walk around a sacred place is to gather it into oneself. From a two-hour lap of Vrindavan’s inner ring to the great forty-day Chaurasi Kos—choose the circle your heart is ready for.
          </p>
        </div>
      </section>

      <section className="bg-cream py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          {loading ? <Loading /> : (
            <div className="space-y-8">
              {items.map((r, i) => (
                <Reveal key={r.slug} delay={i * 0.05}>
                  <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-parchment paper-noise p-5 sm:p-8 border border-ink/5">
                    <div className="lg:col-span-4">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img src={withBase(r.image)} alt={r.name} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="lg:col-span-8">
                      <div className="text-[10px] tracking-[0.3em] uppercase text-gold-3 mb-2">{r.category}</div>
                      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink leading-tight">{r.name}</h2>
                      <p className="mt-4 font-serif text-lg text-ink/70 leading-relaxed">{r.description}</p>
                      <div className="mt-6 flex flex-wrap gap-6 text-sm">
                        <span className="flex items-center gap-2 text-ink/70"><Clock className="w-4 h-4 text-gold-3" /> {r.duration_days} {r.duration_days === 1 ? 'day' : 'days'}</span>
                        <span className="flex items-center gap-2 text-ink/70"><Mountain className="w-4 h-4 text-gold-3" /> {r.difficulty}</span>
                        <span className="flex items-center gap-2 text-ink/70"><Route className="w-4 h-4 text-gold-3" /> {r.stops.length} stops</span>
                      </div>
                      <RouteTimeline stops={r.stops} />
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
