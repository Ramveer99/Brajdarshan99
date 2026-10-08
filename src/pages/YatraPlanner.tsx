import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { apiGet, apiPost } from '../lib/api';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import Loading from '../components/Loading';
import FadeIn from '../components/FadeIn';
import Reveal from '../components/Reveal';
import YatraResult, { type PlanDay } from '../components/YatraResult';

type D = { slug: string; name: string; region: string };
type Plan = PlanDay;

const stepMotion = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
  transition: { duration: 0.35, ease: [0.2, 0.7, 0.2, 1] as const },
};

export default function YatraPlanner() {
  const [dests, setDests] = useState<D[]>([]);
  const [step, setStep] = useState(0);
  const [days, setDays] = useState(3);
  const [pilgrimType, setPilgrimType] = useState('devotional');
  const [start, setStart] = useState('mathura');
  const [travelers, setTravelers] = useState(2);
  const [interests, setInterests] = useState<string[]>(['temples', 'aarti']);
  const [plan, setPlan] = useState<Plan[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { apiGet<D[]>('/api/destinations').then(setDests).catch(() => {}); }, []);

  const toggle = (v: string) => setInterests((i) => i.includes(v) ? i.filter((x) => x !== v) : [...i, v]);

  const submit = async () => {
    setLoading(true);
    try {
      const res = await apiPost<{ plan: Plan[] }>('/api/planner', { days, pilgrimType, start, travelers, interests });
      setPlan(res.plan);
      setStep(4);
    } finally { setLoading(false); }
  };

  const interestOpts = [
    { v: 'temples', label: 'Temples & Darshan' },
    { v: 'aarti', label: 'Aarti & Kirtan' },
    { v: 'parikrama', label: 'Parikrama walks' },
    { v: 'ras-leela', label: 'Ras Leela & Performance' },
    { v: 'cuisine', label: 'Braj cuisine' },
    { v: 'quiet', label: 'Quiet & Reflection' },
  ];

  const pilgrimTypes = [
    { v: 'devotional', label: 'Devotional', d: 'Full immersion — aartis, kirtans, seva' },
    { v: 'heritage', label: 'Heritage', d: 'History, architecture, oral tradition' },
    { v: 'family', label: 'Family', d: 'Gentle pace, key temples, comfort' },
    { v: 'contemplative', label: 'Contemplative', d: 'Solitary walks, ghats, few temples' },
  ];

  return (
    <>
      <section className="bg-ink text-cream pt-28 pb-10">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="text-[11px] tracking-[0.35em] uppercase text-gold-2 mb-6">Yatra Planner</div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl leading-[0.95] max-w-4xl">
              An itinerary <em className="italic text-gold-2">shaped for you.</em>
            </h1>
            <p className="mt-6 font-serif text-lg text-cream/70 max-w-2xl leading-relaxed">
              Four small questions. One considered pilgrimage. Powered by the wisdom of Braj’s local acharyas.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-cream py-10 md:py-14">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          {plan ? (
            <div>
              <Reveal>
                <div className="flex items-end justify-between mb-10">
                  <div>
                    <div className="text-[10px] tracking-[0.3em] uppercase text-gold-3 mb-2">Your composed yatra</div>
                    <h2 className="font-display text-4xl md:text-5xl text-ink">{days} days across Braj</h2>
                  </div>
                  <button onClick={() => { setPlan(null); setStep(0); }} className="text-[11px] tracking-[0.25em] uppercase text-ink/60 hover:text-gold-3">← Start over</button>
                </div>
              </Reveal>
              <YatraResult plan={plan} />
            </div>
          ) : loading ? <Loading label="Composing your yatra" /> : (
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-10">
                {[0, 1, 2, 3].map((s) => (
                  <div key={s} className="h-0.5 flex-1 bg-ink/15 overflow-hidden">
                    <motion.div
                      className="h-full bg-gold origin-left"
                      initial={false}
                      animate={{ scaleX: s <= step ? 1 : 0 }}
                      transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
                    />
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div key="step-0" {...stepMotion}>
                    <div className="text-[11px] tracking-[0.3em] uppercase text-gold-3 mb-3">Question 1 of 4</div>
                    <h3 className="font-display text-3xl md:text-4xl text-ink mb-8">How many days do you have?</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[2, 3, 5, 7].map((d) => (
                        <button key={d} onClick={() => setDays(d)} className={`h-20 sm:h-24 border font-display text-3xl sm:text-4xl transition ${days === d ? 'bg-ink text-cream border-ink' : 'border-ink/20 hover:border-ink text-ink'}`}>{d}</button>
                      ))}
                    </div>
                    <button onClick={() => setStep(1)} className="mt-10 inline-flex items-center gap-3 bg-ink text-cream px-8 h-13 py-3 text-[12px] tracking-[0.25em] uppercase hover:bg-gold-3">Continue <ArrowRight className="w-4 h-4" /></button>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div key="step-1" {...stepMotion}>
                    <div className="text-[11px] tracking-[0.3em] uppercase text-gold-3 mb-3">Question 2 of 4</div>
                    <h3 className="font-display text-3xl md:text-4xl text-ink mb-8">What kind of pilgrim are you?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {pilgrimTypes.map((t) => (
                        <button key={t.v} onClick={() => setPilgrimType(t.v)} className={`p-6 text-left border transition ${pilgrimType === t.v ? 'bg-ink text-cream border-ink' : 'border-ink/20 hover:border-ink'}`}>
                          <div className="font-serif text-xl">{t.label}</div>
                          <div className={`text-sm mt-1 ${pilgrimType === t.v ? 'text-cream/70' : 'text-ink/60'}`}>{t.d}</div>
                        </button>
                      ))}
                    </div>
                    <div className="mt-10 flex flex-wrap gap-3">
                      <button onClick={() => setStep(0)} className="px-6 h-13 py-3 text-[12px] tracking-[0.25em] uppercase border border-ink/20 hover:border-ink">Back</button>
                      <button onClick={() => setStep(2)} className="inline-flex items-center gap-3 bg-ink text-cream px-8 h-13 py-3 text-[12px] tracking-[0.25em] uppercase hover:bg-gold-3">Continue <ArrowRight className="w-4 h-4" /></button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step-2" {...stepMotion}>
                    <div className="text-[11px] tracking-[0.3em] uppercase text-gold-3 mb-3">Question 3 of 4</div>
                    <h3 className="font-display text-3xl md:text-4xl text-ink mb-8">Where would you like to begin?</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {dests.map((d) => (
                        <button key={d.slug} onClick={() => setStart(d.slug)} className={`p-4 text-left border transition ${start === d.slug ? 'bg-ink text-cream border-ink' : 'border-ink/20 hover:border-ink'}`}>
                          <div className="font-serif text-lg">{d.name}</div>
                        </button>
                      ))}
                    </div>
                    <div className="mt-8">
                      <label className="text-[10px] tracking-[0.3em] uppercase text-ink/60">Travellers</label>
                      <input type="number" min={1} max={12} value={travelers} onChange={(e) => setTravelers(Number(e.target.value))} className="mt-2 w-32 border border-ink/20 h-12 px-4 bg-transparent" />
                    </div>
                    <div className="mt-10 flex flex-wrap gap-3">
                      <button onClick={() => setStep(1)} className="px-6 py-3 text-[12px] tracking-[0.25em] uppercase border border-ink/20 hover:border-ink">Back</button>
                      <button onClick={() => setStep(3)} className="inline-flex items-center gap-3 bg-ink text-cream px-8 py-3 text-[12px] tracking-[0.25em] uppercase hover:bg-gold-3">Continue <ArrowRight className="w-4 h-4" /></button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step-3" {...stepMotion}>
                    <div className="text-[11px] tracking-[0.3em] uppercase text-gold-3 mb-3">Question 4 of 4</div>
                    <h3 className="font-display text-3xl md:text-4xl text-ink mb-8">What draws you most?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {interestOpts.map((o) => {
                        const on = interests.includes(o.v);
                        return (
                          <button key={o.v} onClick={() => toggle(o.v)} className={`p-4 text-left border flex items-center gap-3 transition ${on ? 'bg-ink text-cream border-ink' : 'border-ink/20 hover:border-ink'}`}>
                            <span className={`w-5 h-5 border flex items-center justify-center ${on ? 'bg-gold border-gold text-ink' : 'border-ink/40'}`}>
                              {on && <Check className="w-3.5 h-3.5" />}
                            </span>
                            <span className="font-serif text-lg">{o.label}</span>
                          </button>
                        );
                      })}
                    </div>
                    <div className="mt-10 flex flex-wrap gap-3">
                      <button onClick={() => setStep(2)} className="px-6 py-3 text-[12px] tracking-[0.25em] uppercase border border-ink/20 hover:border-ink">Back</button>
                      <button onClick={submit} className="inline-flex items-center gap-3 bg-gold text-ink px-8 py-3 text-[12px] tracking-[0.25em] uppercase hover:bg-gold-2">
                        <Sparkles className="w-4 h-4" /> Compose my yatra
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
