import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiGet } from '../lib/api';
import { withBase } from '../lib/base';
import Loading from '../components/Loading';
import { ArrowLeft, Clock, MapPin, Sparkles } from 'lucide-react';

type T = {
  slug: string; name: string; name_hi: string; deity: string; destination_slug: string; image: string;
  history: string; significance: string; timings: string; aarti_schedule: { name: string; time: string }[]; tips: string;
};

export default function TempleDetail() {
  const { slug } = useParams();
  const [t, setT] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    apiGet<T>(`/api/temples?slug=${slug}`).then(setT).catch(() => {}).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="pt-40"><Loading /></div>;
  if (!t) return <div className="pt-40 text-center text-ink/60">Temple not found.</div>;

  return (
    <>
      <section className="relative min-h-[70svh] text-cream overflow-hidden flex flex-col">
        <img src={withBase(t.image)} alt={t.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink" />
        <div className="relative z-10 mt-auto w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-28 pb-12 sm:pb-20">
          <Link to="/temples" className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-cream/70 hover:text-gold-2 mb-6">
            <ArrowLeft className="w-4 h-4" /> All Temples
          </Link>
          <div className="font-devanagari text-2xl text-gold-2 mb-3">{t.name_hi}</div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl leading-[0.95] break-words">{t.name}</h1>
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-cream/80">
            <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-gold-2" /> Deity · {t.deity}</span>
            <Link to={`/destinations/${t.destination_slug}`} className="flex items-center gap-2 hover:text-gold-2">
              <MapPin className="w-4 h-4 text-gold-2" /> {t.destination_slug.charAt(0).toUpperCase() + t.destination_slug.slice(1)}
            </Link>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-gold-2" /> {t.timings}</span>
          </div>
        </div>
      </section>

      <section className="bg-cream py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <article className="lg:col-span-8 space-y-10">
            <div>
              <div className="text-[11px] tracking-[0.35em] uppercase text-gold-3 mb-4">History</div>
              <div className="font-serif text-lg leading-[1.9] text-ink/85 space-y-4">
                {t.history.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
            <div>
              <div className="text-[11px] tracking-[0.35em] uppercase text-gold-3 mb-4">Significance</div>
              <p className="font-serif text-lg leading-[1.9] text-ink/85 italic">{t.significance}</p>
            </div>
            <div>
              <div className="text-[11px] tracking-[0.35em] uppercase text-gold-3 mb-4">A gentle note</div>
              <p className="text-ink/70 leading-relaxed">{t.tips}</p>
            </div>
          </article>

          <aside className="lg:col-span-4">
            <div className="bg-ink text-cream p-8 sticky top-32">
              <div className="text-[10px] tracking-[0.3em] uppercase text-gold-2 mb-5">Aarti · Darshan Times</div>
              <div className="space-y-4">
                {t.aarti_schedule.map((a, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-cream/10 pb-3">
                    <span className="font-serif text-lg">{a.name}</span>
                    <span className="font-sans text-gold-2 text-sm tracking-wider">{a.time}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-cream/10 text-xs text-cream/60 leading-relaxed">
                Timings may vary during festivals and Ekadashi. Always confirm with local sevaks on the morning of your visit.
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
