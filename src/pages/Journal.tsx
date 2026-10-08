import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiGet } from '../lib/api';
import { withBase } from '../lib/base';
import Loading from '../components/Loading';
import Reveal from '../components/Reveal';

type A = { slug: string; title: string; category: string; excerpt: string; cover_image: string; author: string; published_at: string; read_time: string };

export default function Journal() {
  const [items, setItems] = useState<A[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { apiGet<A[]>('/api/articles').then(setItems).catch(() => {}).finally(() => setLoading(false)); }, []);

  const [featured, ...rest] = items;

  return (
    <>
      <section className="bg-parchment paper-noise pt-40 pb-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-[11px] tracking-[0.35em] uppercase text-gold-3 mb-6">The Braj Journal</div>
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl leading-[0.95] max-w-5xl text-ink">
            Essays from the <em className="italic text-gold-3">field.</em>
          </h1>
          <p className="mt-8 font-serif text-lg text-ink/70 max-w-2xl leading-relaxed">
            An editorial archive of long reads, oral histories, and reflective notes gathered from Braj’s ghats, groves and quiet corners.
          </p>
        </div>
      </section>

      <section className="bg-parchment py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          {loading ? <Loading /> : (
            <>
              {featured && (
                <Reveal>
                  <Link to={`/journal/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-12 gap-10 bg-cream border border-ink/10 hover:border-gold/40 transition">
                    <div className="lg:col-span-7 aspect-[4/3] overflow-hidden">
                      <img src={withBase(featured.cover_image)} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                    </div>
                    <div className="lg:col-span-5 p-8 lg:pr-10 lg:py-14 flex flex-col justify-center">
                      <div className="text-[10px] tracking-[0.3em] uppercase text-gold-3">Featured · {featured.category}</div>
                      <h2 className="font-display text-4xl md:text-5xl text-ink mt-4 leading-tight">{featured.title}</h2>
                      <p className="mt-5 font-serif text-lg text-ink/70 leading-relaxed">{featured.excerpt}</p>
                      <div className="mt-8 text-xs text-ink/60 tracking-wider uppercase">{featured.author} · {featured.read_time}</div>
                    </div>
                  </Link>
                </Reveal>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                {rest.map((a, i) => (
                  <Reveal key={a.slug} delay={i * 0.05}>
                    <Link to={`/journal/${a.slug}`} className="group block">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img src={withBase(a.cover_image)} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      </div>
                      <div className="pt-5">
                        <div className="text-[10px] tracking-[0.3em] uppercase text-gold-3">{a.category}</div>
                        <h3 className="font-serif text-2xl text-ink mt-3 leading-snug group-hover:text-gold-3 transition">{a.title}</h3>
                        <p className="mt-3 text-ink/70 text-sm leading-relaxed line-clamp-3">{a.excerpt}</p>
                        <div className="mt-4 text-xs text-ink/50 tracking-wider uppercase">{a.author} · {a.read_time}</div>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
