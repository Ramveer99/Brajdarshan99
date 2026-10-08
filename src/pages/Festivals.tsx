import { useEffect, useState } from 'react';
import { apiGet } from '../lib/api';
import { withBase } from '../lib/base';
import Loading from '../components/Loading';
import Reveal from '../components/Reveal';
import FadeIn from '../components/FadeIn';
import { FEATURED_FESTIVALS, type Festival } from '../data/fallbackContent';

type F = Festival;

export default function Festivals() {
  const [items, setItems] = useState<F[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    apiGet<F[]>('/api/festivals')
      .then((data) => setItems(Array.isArray(data) && data.length ? data : FEATURED_FESTIVALS))
      .catch(() => setItems(FEATURED_FESTIVALS))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="bg-ink text-cream pt-28 pb-12">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="text-[11px] tracking-[0.35em] uppercase text-gold-2 mb-6">The Utsav Calendar</div>
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] max-w-5xl">
              A whole year of <em className="italic text-gold-2">bhakti.</em>
            </h1>
            <p className="mt-8 font-serif text-lg text-cream/70 max-w-2xl leading-relaxed">
              The Braj calendar is a rotating stage of festivals—each rooted in a leela, each moving the land through a season of colour, sound and sweet.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-cream py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          {loading ? <Loading /> : (
            <div className="space-y-6">
              {items.map((f, i) => (
                <Reveal key={i} delay={i * 0.03}>
                  <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-parchment/50 border border-ink/5 p-6 md:p-8">
                    <div className="lg:col-span-3 aspect-[4/3] overflow-hidden">
                      <img src={withBase(f.image)} alt={f.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="lg:col-span-2 text-center lg:text-left">
                      <div className="text-[10px] tracking-[0.3em] uppercase text-gold-3">Month</div>
                      <div className="font-display text-3xl text-ink mt-1">{f.month}</div>
                      <div className="text-[11px] tracking-[0.2em] uppercase text-ink/60 mt-2">{f.destination}</div>
                    </div>
                    <div className="lg:col-span-7">
                      <h2 className="font-display text-3xl md:text-4xl text-ink">{f.name}</h2>
                      <p className="mt-3 font-serif text-lg text-ink/75 leading-relaxed">{f.description}</p>
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
