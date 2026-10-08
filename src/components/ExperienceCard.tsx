import { Clock, MapPin } from 'lucide-react';
import { withBase } from '../lib/base';

type Props = {
  title: string;
  category: string;
  duration: string;
  location: string;
  description: string;
  image: string;
};

export default function ExperienceCard({ title, category, duration, location, description, image }: Props) {
  return (
    <article className="group flex flex-col h-full bg-cream border border-ink/10 hover:border-gold/50 transition-colors overflow-hidden hover-lift">
      <div className="aspect-[4/3] overflow-hidden shrink-0">
        <img src={withBase(image)} alt={title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="text-2xs tracking-[0.3em] uppercase text-gold-3 mb-3">{category}</div>
        <h3 className="font-serif text-2xl leading-snug text-ink min-h-[3.25rem] line-clamp-2">{title}</h3>
        <p className="mt-3 text-ink-soft text-body-sm leading-relaxed line-clamp-3 flex-1">{description}</p>
        <div className="mt-auto pt-5 border-t border-ink/10 flex items-center justify-between text-caption text-ink-muted">
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" aria-hidden="true" /> {duration}</span>
          <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" aria-hidden="true" /> {location}</span>
        </div>
      </div>
    </article>
  );
}
