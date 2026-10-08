import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { withBase } from '../lib/base';

type Props = {
  slug: string;
  name: string;
  nameHi?: string;
  deity: string;
  destination: string;
  image: string;
};

export default function TempleCard({ slug, name, nameHi, deity, destination, image }: Props) {
  return (
    <Link to={`/temples/${slug}`} className="group flex items-center gap-5 p-4 bg-cream border border-ink/10 hover:border-gold/40 transition-all">
      <div className="w-24 h-24 flex-shrink-0 overflow-hidden">
        <img src={withBase(image)} alt={name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] tracking-[0.25em] uppercase text-gold-3">{destination}</div>
        <h4 className="font-serif text-xl text-ink truncate mt-1">{name}</h4>
        {nameHi && <div className="font-devanagari text-ink/50 text-sm">{nameHi}</div>}
        <div className="text-xs text-ink/60 mt-1">Deity: {deity}</div>
      </div>
      <ChevronRight className="w-4 h-4 text-ink/40 group-hover:text-gold-3 group-hover:translate-x-1 transition" />
    </Link>
  );
}
