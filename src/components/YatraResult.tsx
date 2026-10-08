import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Clock, Map as MapIcon, List } from 'lucide-react';

export type TempleTime = { name: string; hours: string; aarti: string };

export type PlanDay = {
  day: number;
  destination: string;
  morning: string;
  afternoon: string;
  evening: string;
  note: string;
  stay?: string;
  breakfast?: string;
  lunch?: string;
  dinner?: string;
  places?: string[];
  before?: string;
  temples?: TempleTime[];
};

/** Road kilometres between bases. Pairs are stored in alphabetical order. */
const KM: Record<string, number> = {
  'Baldeo|Barsana': 62,
  'Baldeo|Gokul': 10,
  'Baldeo|Govardhan': 42,
  'Baldeo|Kokilavan': 48,
  'Baldeo|Mathura': 22,
  'Baldeo|Nandgaon': 65,
  'Baldeo|Raval': 18,
  'Baldeo|Vrindavan': 28,
  'Barsana|Gokul': 55,
  'Barsana|Govardhan': 26,
  'Barsana|Kokilavan': 28,
  'Barsana|Mathura': 50,
  'Barsana|Nandgaon': 8,
  'Barsana|Raval': 42,
  'Barsana|Vrindavan': 42,
  'Gokul|Govardhan': 32,
  'Gokul|Kokilavan': 38,
  'Gokul|Mathura': 15,
  'Gokul|Nandgaon': 58,
  'Gokul|Raval': 12,
  'Gokul|Vrindavan': 22,
  'Govardhan|Kokilavan': 55,
  'Govardhan|Mathura': 25,
  'Govardhan|Nandgaon': 30,
  'Govardhan|Raval': 40,
  'Govardhan|Vrindavan': 22,
  'Kokilavan|Mathura': 45,
  'Kokilavan|Nandgaon': 22,
  'Kokilavan|Raval': 40,
  'Kokilavan|Vrindavan': 48,
  'Mathura|Nandgaon': 55,
  'Mathura|Raval': 28,
  'Mathura|Vrindavan': 15,
  'Nandgaon|Raval': 48,
  'Nandgaon|Vrindavan': 48,
  'Raval|Vrindavan': 30,
};

function kmBetween(a: string, b: string) {
  return KM[[a, b].sort().join('|')];
}

const SITES: Record<string, { x: number; y: number }> = {
  Barsana: { x: 195, y: 165 },
  Nandgaon: { x: 260, y: 210 },
  Kokilavan: { x: 330, y: 175 },
  Govardhan: { x: 245, y: 380 },
  Vrindavan: { x: 390, y: 310 },
  Mathura: { x: 410, y: 410 },
  Raval: { x: 490, y: 390 },
  Gokul: { x: 510, y: 445 },
  Baldeo: { x: 560, y: 500 },
};

const VIEWS = [
  { id: 'map', label: 'Map', icon: MapIcon },
  { id: 'plan', label: 'Plan', icon: List },
  { id: 'temples', label: 'Temple times', icon: Clock },
] as const;

type View = (typeof VIEWS)[number]['id'];

const ease = [0.2, 0.7, 0.2, 1] as const;

export default function YatraResult({ plan }: { plan: PlanDay[] }) {
  const [view, setView] = useState<View>('map');
  const [openDay, setOpenDay] = useState(plan[0]?.day ?? 1);

  const active = plan.find((p) => p.day === openDay) ?? plan[0];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <div className="inline-flex border border-ink/15 bg-cream p-1" role="tablist" aria-label="How to read the yatra">
          {VIEWS.map((v) => {
            const Icon = v.icon;
            const on = view === v.id;
            return (
              <button
                key={v.id}
                role="tab"
                aria-selected={on}
                onClick={() => setView(v.id)}
                className={`relative inline-flex items-center gap-2 px-4 h-10 text-[11px] tracking-[0.2em] uppercase transition ${on ? 'text-cream' : 'text-ink/60 hover:text-ink'} rounded-sm shadow-sm`}
              >
                {on && (
                  <motion.span
                    layoutId="yatra-view"
                    className="absolute inset-0 bg-ink rounded-sm shadow-sm"
                    transition={{ duration: 0.35, ease }}
                  />
                )}
                <span className="relative z-10 inline-flex items-center gap-2 rounded-sm shadow-sm">
                  <Icon className="w-3.5 h-3.5" />
                  {v.label}
                </span>
              </button>
            );
          })}
        </div>
        <p className="text-sm text-ink/50">
          {view === 'plan' && 'Open a day for stay, meals, and temple hours.'}
          {view === 'map' && 'Select a stop to read that day.'}
          {view === 'temples' && 'Darshan hours for every temple on this route.'}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {view === 'plan' && (
          <motion.div
            key="plan"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease }}
            className="space-y-3"
          >
            {plan.map((p, i) => (
              <DayCard
                key={p.day}
                day={p}
                index={i}
                open={openDay === p.day}
                onToggle={() => setOpenDay((d) => (d === p.day ? 0 : p.day))}
              />
            ))}
          </motion.div>
        )}

        {view === 'map' && active && (
          <motion.div
            key="map"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease }}
          >
            <RouteMap plan={plan} active={active} onSelect={setOpenDay} />
          </motion.div>
        )}

        {view === 'temples' && (
          <motion.div
            key="temples"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease }}
            className="space-y-8"
          >
            <p className="text-sm text-ink/55 max-w-2xl leading-relaxed">
              Usual darshan hours. Festivals and Ekadashi move the bells — confirm with the sevaks that morning.
            </p>
            {plan.map((p, i) => (
              <motion.section
                key={p.day}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4, ease }}
              >
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-display text-3xl text-ink leading-none">{String(p.day).padStart(2, '0')}</span>
                  <span className="font-serif text-xl text-ink">{p.destination}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {(p.temples ?? []).map((t) => (
                    <TempleCard key={t.name} temple={t} />
                  ))}
                </div>
              </motion.section>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DayCard({
  day,
  index,
  open,
  onToggle,
}: {
  day: PlanDay;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const firstTemple = day.temples?.[0];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.45, ease }}
      className={`border bg-parchment/40 overflow-hidden ${open ? 'border-ink/30' : 'border-ink/10 hover:border-ink/25'}`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="w-full text-left px-5 py-5 md:px-7 md:py-6 flex items-center gap-4 md:gap-6"
      >
        <span className="font-display text-4xl md:text-5xl text-ink leading-none w-14 shrink-0">
          {String(day.day).padStart(2, '0')}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-serif text-2xl text-ink">{day.destination}</span>
          <span className="mt-1 block text-sm text-ink/60 truncate">
            {firstTemple ? `${firstTemple.name} · ${firstTemple.hours}` : day.morning}
          </span>
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="text-gold-3 shrink-0">
          <ChevronDown className="w-5 h-5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-6 md:px-7 md:pb-8 border-t border-ink/10">
              <p className="mt-5 font-serif italic text-ink/70 leading-relaxed max-w-3xl">{day.note}</p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {day.stay && <Detail label="Stay" text={day.stay} wide />}
                {day.breakfast && <Detail label="Breakfast" text={day.breakfast} />}
                {day.lunch && <Detail label="Lunch" text={day.lunch} />}
                {day.dinner && <Detail label="Dinner" text={day.dinner} wide />}
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Hour label="Morning" text={day.morning} />
                <Hour label="Afternoon" text={day.afternoon} />
                <Hour label="Evening" text={day.evening} />
              </div>

              {day.temples && day.temples.length > 0 && (
                <div className="mt-6">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-gold-3 mb-3">Temple times</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {day.temples.map((t) => (
                      <TempleCard key={t.name} temple={t} />
                    ))}
                  </div>
                </div>
              )}

              {day.before && (
                <p className="mt-5 text-sm text-ink/65 leading-relaxed">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-gold-3 block mb-1">Before you go</span>
                  {day.before}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

function Detail({ label, text, wide }: { label: string; text: string; wide?: boolean }) {
  return (
    <div className={`bg-cream border border-ink/10 px-4 py-3 ${wide ? 'sm:col-span-2' : ''}`}>
      <div className="text-[10px] tracking-[0.3em] uppercase text-gold-3 mb-1">{label}</div>
      <p className="text-sm text-ink/80 leading-relaxed">{text}</p>
    </div>
  );
}

function Hour({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <div className="text-[10px] tracking-[0.3em] uppercase text-ink/40 mb-1">{label}</div>
      <p className="text-sm text-ink/80 leading-relaxed">{text}</p>
    </div>
  );
}

function TempleCard({ temple }: { temple: TempleTime }) {
  return (
    <div className="bg-cream border border-ink/10 px-4 py-4">
      <div className="font-serif text-lg text-ink">{temple.name}</div>
      <div className="mt-2 flex items-start gap-2 text-sm text-ink/80">
        <Clock className="w-3.5 h-3.5 mt-0.5 text-gold-3 shrink-0" />
        <span>{temple.hours}</span>
      </div>
      <div className="mt-1 pl-5 text-sm text-ink/55">{temple.aarti}</div>
    </div>
  );
}

function RouteMap({
  plan,
  active,
  onSelect,
}: {
  plan: PlanDay[];
  active: PlanDay;
  onSelect: (day: number) => void;
}) {
  const stops = plan
    .map((p) => ({ ...p, point: SITES[p.destination] }))
    .filter((p) => p.point);
  const d = stops.map((s, i) => `${i === 0 ? 'M' : 'L'} ${s.point.x} ${s.point.y}`).join(' ');
  const xs = stops.map((s) => s.point.x);
  const ys = stops.map((s) => s.point.y);
  const legs = stops.slice(0, -1).map((from, i) => {
    const to = stops[i + 1];
    const km = kmBetween(from.destination, to.destination);
    const dx = to.point.x - from.point.x;
    const dy = to.point.y - from.point.y;
    const len = Math.hypot(dx, dy) || 1;
    const mx = (from.point.x + to.point.x) / 2;
    const my = (from.point.y + to.point.y) / 2;
    const nx = -dy / len;
    const ny = dx / len;
    const obstacles = stops.flatMap((s) => [
      { x: s.point.x, y: s.point.y },
      { x: s.point.x, y: s.point.y - 22 },
    ]);
    const spot = [22, -22, 34, -34]
      .map((shift) => ({ x: mx + nx * shift, y: my + ny * shift }))
      .sort((a, b) => {
        const clearance = (p: { x: number; y: number }) => Math.min(...obstacles.map((o) => Math.hypot(p.x - o.x, p.y - o.y)));
        return clearance(b) - clearance(a);
      })[0];
    return { key: `${from.day}-${to.day}`, km, x: spot.x, y: spot.y };
  });
  const totalKm = legs.reduce((sum, leg) => sum + (leg.km ?? 0), 0);
  const minX = Math.min(...xs) - 110;
  const maxX = Math.max(...xs) + 110;
  const minY = Math.min(...ys) - 70;
  const maxY = Math.max(...ys) + 55;
  const viewBox = `${minX} ${minY} ${Math.max(220, maxX - minX)} ${Math.max(180, maxY - minY)}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 border border-ink/10 overflow-hidden">
      <div className="lg:col-span-7 bg-ink text-cream p-4 md:p-6">
        <svg viewBox={viewBox} className="w-full h-auto">
          <path
            d="M 380 520 C 430 470, 400 430, 470 390 C 530 355, 545 330, 600 270"
            stroke="#3b6dcf"
            strokeWidth="10"
            fill="none"
            opacity="0.35"
          />
          {d && (
            <motion.path
              d={d}
              fill="none"
              stroke="#c9a24a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, ease }}
            />
          )}
          {stops.map((s) => {
            const on = s.day === active.day;
            return (
              <g key={s.day} onClick={() => onSelect(s.day)} className="cursor-pointer">
                <circle cx={s.point.x} cy={s.point.y} r={on ? 16 : 11} fill={on ? '#c9a24a' : '#0b1030'} stroke="#c9a24a" strokeWidth="1.5" />
                <text
                  x={s.point.x}
                  y={s.point.y + 4}
                  textAnchor="middle"
                  fill={on ? '#0b1030' : '#e8c877'}
                  fontSize="11"
                  fontFamily="Fraunces, serif"
                >
                  {String(s.day).padStart(2, '0')}
                </text>
                <text
                  x={s.point.x}
                  y={s.point.y - 20}
                  textAnchor="middle"
                  fill="#f6efdd"
                  fontSize="13"
                  fontFamily="Fraunces, serif"
                >
                  {s.destination}
                </text>
              </g>
            );
          })}
          {legs.map((leg) => leg.km != null && (
            <g key={leg.key}>
              <rect x={leg.x - 24} y={leg.y - 9} width="48" height="16" fill="#0b1030" stroke="#c9a24a" strokeWidth="0.6" />
              <text x={leg.x} y={leg.y + 3} textAnchor="middle" fill="#e8c877" fontSize="10" fontFamily="Manrope, sans-serif">
                {leg.km} km
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="lg:col-span-5 bg-cream p-5 md:p-7">
        <div className="text-[10px] tracking-[0.3em] uppercase text-gold-3 mb-4">The route</div>
        <ol>
          {plan.map((p, i) => {
            const on = p.day === active.day;
            const next = plan[i + 1];
            const km = next ? kmBetween(p.destination, next.destination) : undefined;
            return (
              <li key={p.day}>
                <button
                  type="button"
                  onClick={() => onSelect(p.day)}
                  className={`w-full text-left px-3 py-3 flex items-center gap-3 transition ${on ? 'bg-ink text-cream' : 'hover:bg-parchment'}`}
                >
                  <span className={`font-display text-2xl leading-none ${on ? 'text-gold-2' : 'text-ink'}`}>
                    {String(p.day).padStart(2, '0')}
                  </span>
                  <span>
                    <span className="block font-serif text-lg">{p.destination}</span>
                    <span className={`block text-xs mt-0.5 ${on ? 'text-cream/60' : 'text-ink/50'}`}>
                      {p.temples?.[0] ? p.temples[0].hours : p.morning}
                    </span>
                  </span>
                </button>
                {next && km != null && (
                  <div className="ml-6 pl-3 border-l border-gold-3/40 py-1 text-[11px] tracking-[0.16em] uppercase text-gold-3">
                    {km} km
                  </div>
                )}
              </li>
            );
          })}
        </ol>
        {totalKm > 0 && (
          <p className="mt-4 text-sm text-ink/60">About {totalKm} km by road between these bases.</p>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={active.day}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease }}
            className="mt-5 pt-5 border-t border-ink/10"
          >
            <p className="font-serif italic text-ink/70 leading-relaxed">{active.note}</p>
            {active.stay && <p className="mt-3 text-sm text-ink/75 leading-relaxed">{active.stay}</p>}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
