import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiGet } from '../lib/api';
import { withBase } from '../lib/base';
import Loading from '../components/Loading';
import { ArrowLeft } from 'lucide-react';

type A = { slug: string; title: string; category: string; excerpt: string; content: string; cover_image: string; author: string; published_at: string; read_time: string };

export default function ArticleDetail() {
  const { slug } = useParams();
  const [a, setA] = useState<A | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { if (!slug) return; apiGet<A>(`/api/articles?slug=${slug}`).then(setA).catch(() => {}).finally(() => setLoading(false)); }, [slug]);

  if (loading) return <div className="pt-40"><Loading /></div>;
  if (!a) return <div className="pt-40 text-center text-ink/60">Article not found.</div>;

  return (
    <>
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden text-cream">
        <img src={withBase(a.cover_image)} alt={a.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/50 to-ink" />
        <div className="relative z-10 h-full max-w-4xl mx-auto px-6 lg:px-10 flex flex-col justify-end pb-20">
          <Link to="/journal" className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-cream/70 hover:text-gold-2 mb-6">
            <ArrowLeft className="w-4 h-4" /> The Journal
          </Link>
          <div className="text-[10px] tracking-[0.3em] uppercase text-gold-2 mb-4">{a.category}</div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.98]">{a.title}</h1>
          <div className="mt-8 flex items-center gap-4 text-cream/70 text-sm">
            <span>By {a.author}</span>
            <span>―</span>
            <span>{a.published_at}</span>
            <span>―</span>
            <span>{a.read_time}</span>
          </div>
        </div>
      </section>

      <article className="bg-cream py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <p className="font-serif text-2xl md:text-3xl italic text-ink/85 leading-[1.4] mb-14">{a.excerpt}</p>
          <div className="prose-braj space-y-7 font-serif text-lg md:text-xl leading-[1.9] text-ink/85">
            {a.content.split('\n\n').map((p, i) => {
              if (p.startsWith('## ')) return <h2 key={i} className="font-display text-3xl md:text-4xl text-ink mt-14 mb-2 not-italic">{p.replace('## ', '')}</h2>;
              if (p.startsWith('> ')) return <blockquote key={i} className="border-l-2 border-gold pl-6 italic text-ink/70 my-8">{p.replace('> ', '')}</blockquote>;
              return <p key={i}>{p}</p>;
            })}
          </div>
          <div className="mt-16 pt-8 border-t border-ink/10 text-center">
            <div className="font-devanagari text-gold-3 text-2xl">राधे राधे</div>
          </div>
        </div>
      </article>
    </>
  );
}
