import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { withBase } from '../lib/base';

type Props = {
  slug: string;
  name: string;
  nameHi?: string;
  tagline: string;
  image: string;
  region?: string;
  index?: number;
};

export default function DestinationCard({ slug, name, nameHi, tagline, image, region, index }: Props) {
  return (
    <Link
      to={`/destinations/${slug}`}
      aria-label={`${name} — ${tagline}`}
      className="group block relative overflow-hidden bg-ink hover-lift deep-shadow"
    >
      <div className="aspect-[4/5] w-full relative overflow-hidden">
        <img
          src={withBase(image)}
          alt={name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink/85 via-ink/40 to-transparent pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
        <div className="absolute inset-0 border border-transparent group-hover:border-gold/40 transition-colors duration-500"></div>
        {typeof index === 'number' && (
          <div className="absolute top-5 left-5 text-caption tracking-[0.28em] text-cream uppercase bg-ink/50 backdrop-blur-sm px-2 py-1">
            No. {String(index + 1).padStart(2, '0')}
          </div>
        )}
        {region && (
          <div className="absolute top-5 right-5 text-caption tracking-[0.25em] uppercase text-gold-2 bg-ink/60 backdrop-blur-sm border border-gold/40 px-2.5 py-1">
            {region}
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-7">
          {nameHi && <div className="font-devanagari text-gold-2 text-lg mb-1 opacity-90">{nameHi}</div>}
          <h3 className="font-serif text-2xl lg:text-3xl text-cream leading-tight">{name}</h3>
          <p className="mt-2 text-cream-soft text-body-sm max-w-xs leading-relaxed">{tagline}</p>
          <div className="mt-5 flex items-center gap-2 text-caption tracking-[0.25em] uppercase text-gold-2">
            Explore <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
          </div>
        </div>
      </div>
    </Link>
  );
}
