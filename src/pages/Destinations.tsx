import { useEffect, useMemo, useState } from 'react';
import { apiGet } from '../lib/api';
import DestinationCard from '../components/DestinationCard';
import BrajMap from '../components/BrajMap';
import Reveal from '../components/Reveal';
import FadeIn from '../components/FadeIn';
import SectionHeading from '../components/SectionHeading';
import Loading from '../components/Loading';
import { DESTINATION_PAGES } from '../data/fallbackContent';

type D = { slug: string; name: string; name_hi: string; tagline: string; hero_image: string; region: string; deity: string; best_time: string };

export default function Destinations() {
  const [items, setItems] = useState<D[]>([]);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState('All');

  useEffect(() => {
    apiGet<D[]>('/api/destinations')
      .then((data) => setItems(Array.isArray(data) && data.length ? data : DESTINATION_PAGES))
      .catch(() => setItems(DESTINATION_PAGES))
      .finally(() => setLoading(false));
  }, []);

  const regions = useMemo(() => ['All', ...Array.from(new Set(items.map((i) => i.region)))], [items]);
  const filtered = region === 'All' ? items : items.filter((i) => i.region === region);

  return (
    <>
      <section className="bg-ink text-cream pt-28 pb-12 md:pb-16 border-b border-cream/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="text-[11px] tracking-[0.35em] uppercase text-gold-2 mb-6">The Sacred Villages</div>
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] max-w-4xl">
              Nine <em className="italic text-gold-2">names</em> the wind of Braj still murmurs.
            </h1>
            <p className="mt-8 font-serif text-lg md:text-xl text-cream/70 max-w-2xl leading-relaxed">
              Mathura holds His birth. Vrindavan holds His youth. Barsana holds Her. Gokul cradles His infancy, and Govardhan bears the memory of the day the sky was lifted. Choose where to begin.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-ink text-cream pb-12">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <BrajMap />
        </div>
      </section>

      <section className="bg-parchment paper-noise py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap gap-3 mb-12">
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className={`px-5 h-11 text-[11px] tracking-[0.25em] uppercase border transition ${
                  region === r ? 'bg-ink text-cream border-ink' : 'bg-transparent text-ink border-ink/25 hover:border-ink'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {loading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((d, i) => (
                <Reveal key={d.slug} delay={i * 0.04}>
                  <DestinationCard
                    slug={d.slug}
                    name={d.name}
                    nameHi={d.name_hi}
                    tagline={d.tagline}
                    image={d.hero_image}
                    region={d.region}
                    index={i}
                  />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
