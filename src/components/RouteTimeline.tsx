import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Flag, RotateCcw } from 'lucide-react';

type Props = {
  stops: string[];
};

type StopInfo = {
  place: string;
  detail: string;
};

const STOP_DETAILS: Record<string, StopInfo> = {
  'Keshi Ghat': {
    place: 'Vrindavan',
    detail: 'Sandy steps on the Yamuna where Krishna overcame the Keshi demon. The inner parikrama opens and closes here, while the river is still quiet.',
  },
  'Banke Bihari': {
    place: 'Vrindavan',
    detail: 'The temple of the three-bent form in Loi Bazaar. Darshan is brief; the shrine closes at midday for rajbhog and opens again in the evening.',
  },
  'Radha Raman': {
    place: 'Vrindavan',
    detail: 'A smaller temple a few lanes from the bazaar, known for a steady Mangala and Sandhya aarti. A quieter hour after Banke Bihari.',
  },
  Nidhivan: {
    place: 'Vrindavan',
    detail: 'The tulsi grove said to be the site of the raas. The gates close in the evening, and the trees are left to themselves after dusk.',
  },
  'Seva Kunj': {
    place: 'Vrindavan',
    detail: 'The grove beside Nidhivan where the gopis are said to have served Krishna. Best walked in the late afternoon, before the lanes fill.',
  },
  'Manasi Ganga': {
    place: 'Govardhan',
    detail: 'The kund at the foot of the hill where the parikrama usually begins, often before six, barefoot if you can.',
  },
  'Daan Ghati': {
    place: 'Govardhan',
    detail: 'The narrow pass where Krishna is said to have asked the gopis for a toll of milk and butter on their way to market.',
  },
  'Radha Kund': {
    place: 'Govardhan',
    detail: 'The bathing tank of Radha, a short walk off the hill path. Pilgrims pause here before continuing the circuit.',
  },
  'Kusum Sarovar': {
    place: 'Govardhan',
    detail: 'A sandstone tank and garden on the parikrama path, luminous at first light when the water is still.',
  },
  Punchari: {
    place: 'Govardhan',
    detail: 'The far end of Giriraj, where the path turns and the walk heads back toward Manasi Ganga.',
  },
  Barsana: {
    place: 'Northern Braj',
    detail: 'Radha’s village on the ridge. The Ladli Lal temple crowns the hill, with the plain and Nandgaon in view below.',
  },
  'Sankari Khor': {
    place: 'Barsana',
    detail: 'The narrow lane between two hills where Krishna is said to have waylaid the gopis carrying milk.',
  },
  Raval: {
    place: 'Northern Braj',
    detail: 'The small village where Radha was born, still set among fields. Most walkers pair it with Barsana the same morning.',
  },
  Nandgaon: {
    place: 'Northern Braj',
    detail: 'Nand Baba’s village on the hill facing Barsana. The climb is short, and the fields run unbroken toward Radha’s ridge.',
  },
  Mathura: {
    place: 'Central Braj',
    detail: 'The city of Krishna’s birth. Vishram Ghat and the Janmabhoomi mark where the great circle of Braj begins and ends.',
  },
  Vrindavan: {
    place: 'Eastern Braj',
    detail: 'The forest town of the leelas, a short journey from Mathura along the Yamuna, still arranged around its groves and ghats.',
  },
  Gokul: {
    place: 'Eastern Braj',
    detail: 'The village across the river where Yashoda raised the infant Krishna, with lanes that still feel like a household.',
  },
  Govardhan: {
    place: 'Western Braj',
    detail: 'The hill lifted on a single finger. Pilgrims walk the stones barefoot, leaving milk and sweets along the path.',
  },
};

type ActiveStop = {
  stop: string;
  idx: number;
  isFirst: boolean;
  isLast: boolean;
  rect: DOMRect;
};

function roleLabel(isFirst: boolean, isLast: boolean, idx: number) {
  if (isFirst && isLast) return 'Only stop';
  if (isFirst) return 'Start';
  if (isLast) return 'Return';
  return `Stop ${idx + 1}`;
}

function StopPopup({ active }: { active: ActiveStop }) {
  const width = 260;
  const margin = 16;
  const center = active.rect.left + active.rect.width / 2;
  const left = Math.min(Math.max(margin, center - width / 2), window.innerWidth - width - margin);
  const placeAbove = active.rect.top > 190;
  const top = placeAbove ? active.rect.top - 12 : active.rect.bottom + 12;
  const info = STOP_DETAILS[active.stop] ?? {
    place: 'Braj',
    detail: 'A stop on this parikrama.',
  };
  const arrowLeft = Math.min(Math.max(16, center - left), width - 16);

  return createPortal(
    <div
      role="tooltip"
      className="pointer-events-none fixed z-50 w-[260px]"
      style={{
        left,
        top,
        transform: placeAbove ? 'translateY(-100%)' : undefined,
      }}
    >
      <div className="relative bg-cream border border-ink/15 px-4 py-3.5 text-left shadow-[0_16px_40px_rgba(11,16,48,0.16)]">
        <div className="text-[10px] tracking-[0.22em] uppercase text-gold-3">
          {String(active.idx + 1).padStart(2, '0')} · {roleLabel(active.isFirst, active.isLast, active.idx)}
        </div>
        <div className="mt-1 font-serif text-lg text-ink leading-snug">{active.stop}</div>
        <div className="mt-0.5 text-[11px] tracking-[0.16em] uppercase text-ink/40">{info.place}</div>
        <p className="mt-2 text-sm text-ink/75 leading-relaxed">{info.detail}</p>
        <span
          aria-hidden="true"
          className={`absolute h-2.5 w-2.5 rotate-45 border-ink/15 bg-cream ${
            placeAbove ? '-bottom-[5px] border-b border-r' : '-top-[5px] border-t border-l'
          }`}
          style={{ left: arrowLeft, marginLeft: -5 }}
        />
      </div>
    </div>,
    document.body,
  );
}

export default function RouteTimeline({ stops }: Props) {
  const [active, setActive] = useState<ActiveStop | null>(null);
  const hideTimer = useRef<number | null>(null);
  const anchorRef = useRef<HTMLElement | null>(null);

  const clearHide = () => {
    if (hideTimer.current != null) {
      window.clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  };

  const show = (el: HTMLElement, stop: string, idx: number, isFirst: boolean, isLast: boolean) => {
    clearHide();
    anchorRef.current = el;
    setActive({ stop, idx, isFirst, isLast, rect: el.getBoundingClientRect() });
  };

  const hide = () => {
    clearHide();
    hideTimer.current = window.setTimeout(() => setActive(null), 80);
  };

  useEffect(() => {
    if (!active) return;
    const reposition = () => {
      const el = anchorRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const offscreen = rect.bottom < 48 || rect.top > window.innerHeight - 24;
      if (offscreen) {
        setActive(null);
        return;
      }
      setActive((prev) => (prev ? { ...prev, rect } : prev));
    };
    window.addEventListener('scroll', reposition, true);
    window.addEventListener('resize', reposition);
    return () => {
      window.removeEventListener('scroll', reposition, true);
      window.removeEventListener('resize', reposition);
    };
  }, [active?.idx, active?.stop]);

  useEffect(() => () => clearHide(), []);

  if (stops.length === 0) return null;

  const isCircuit = stops.length > 2;

  return (
    <div className="mt-6 pt-6 border-t border-ink/10">
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2 mb-5">
        <div className="text-[10px] tracking-[0.3em] uppercase text-gold-3">Route</div>
        {isCircuit && (
          <div className="inline-flex items-center gap-1.5 text-caption text-ink-muted">
            <RotateCcw className="w-3.5 h-3.5 text-gold-3 shrink-0" aria-hidden="true" />
            <span className="font-serif italic">Circumambulation · {stops.length} stops</span>
          </div>
        )}
      </div>

      <ol className="relative md:hidden space-y-0" aria-label="Pilgrimage route">
        {stops.map((stop, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === stops.length - 1;
          const isMilestone = isFirst || isLast;

          return (
            <li key={`${stop}-${idx}`} className="relative flex gap-4 pb-5 last:pb-0">
              {idx < stops.length - 1 && (
                <span
                  className="absolute left-[11px] top-6 bottom-0 w-px bg-gradient-to-b from-gold/50 to-gold/20"
                  aria-hidden="true"
                />
              )}

              <button
                type="button"
                aria-label={`${stop}, ${roleLabel(isFirst, isLast, idx)}`}
                onMouseEnter={(e) => show(e.currentTarget, stop, idx, isFirst, isLast)}
                onMouseLeave={hide}
                onFocus={(e) => show(e.currentTarget, stop, idx, isFirst, isLast)}
                onBlur={hide}
                className={`relative z-10 mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-semibold tabular-nums ${
                  isMilestone
                    ? 'border-gold bg-gold/15 text-gold-3'
                    : 'border-ink/15 bg-cream text-ink/55'
                }`}
              >
                {idx + 1}
              </button>

              <div className="min-w-0 pt-0.5">
                <button
                  type="button"
                  className="text-left font-serif text-body-sm text-ink/90 leading-snug hover:text-ink"
                  onMouseEnter={(e) => show(e.currentTarget, stop, idx, isFirst, isLast)}
                  onMouseLeave={hide}
                  onFocus={(e) => show(e.currentTarget, stop, idx, isFirst, isLast)}
                  onBlur={hide}
                >
                  {stop}
                </button>
                {isFirst && (
                  <div className="mt-1 inline-flex items-center gap-1 text-2xs tracking-[0.18em] uppercase text-gold-3">
                    <Flag className="w-3 h-3" aria-hidden="true" />
                    Start
                  </div>
                )}
                {isLast && stops.length > 1 && (
                  <div className="mt-1 inline-flex items-center gap-1 text-2xs tracking-[0.18em] uppercase text-gold-3">
                    <RotateCcw className="w-3 h-3" aria-hidden="true" />
                    {isFirst ? 'Complete circuit' : 'Return'}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      <div className="hidden md:block">
        <div className="overflow-x-auto pb-1 -mx-1 px-1">
          <ol
            className="flex items-start min-w-full"
            style={{ minWidth: `${stops.length * 7.5}rem` }}
            aria-label="Pilgrimage route"
          >
            {stops.map((stop, idx) => {
              const isFirst = idx === 0;
              const isLast = idx === stops.length - 1;
              const isMilestone = isFirst || isLast;
              const open = active?.idx === idx && active.stop === stop;

              return (
                <li key={`${stop}-${idx}`} className="group flex flex-1 min-w-0">
                  <button
                    type="button"
                    className="flex flex-col items-center text-center w-full px-1 bg-transparent"
                    aria-label={`${stop}, ${roleLabel(isFirst, isLast, idx)}`}
                    onMouseEnter={(e) => show(e.currentTarget, stop, idx, isFirst, isLast)}
                    onMouseLeave={hide}
                    onFocus={(e) => show(e.currentTarget, stop, idx, isFirst, isLast)}
                    onBlur={hide}
                  >
                    <div className="relative flex w-full items-center justify-center">
                      {idx > 0 && (
                        <span
                          className="absolute right-1/2 left-0 top-[11px] border-t border-dashed border-gold/55"
                          aria-hidden="true"
                        />
                      )}
                      {idx < stops.length - 1 && (
                        <span
                          className="absolute left-1/2 right-0 top-[11px] border-t border-dashed border-gold/55"
                          aria-hidden="true"
                        />
                      )}

                      <span
                        className={`relative z-10 flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 text-[10px] font-semibold tabular-nums transition-colors ${
                          open || isMilestone
                            ? 'border-gold bg-gold/15 text-gold-3'
                            : 'border-ink/15 bg-cream text-ink/55 group-hover:border-gold group-hover:bg-gold/10'
                        }`}
                      >
                        {idx + 1}
                      </span>
                    </div>

                    <span className="mt-3 font-serif text-body-sm text-ink/90 leading-snug line-clamp-2 px-0.5">
                      {stop}
                    </span>

                    {isFirst && (
                      <span className="mt-1.5 inline-flex items-center gap-1 text-2xs tracking-[0.18em] uppercase text-gold-3">
                        <Flag className="w-3 h-3" aria-hidden="true" />
                        Start
                      </span>
                    )}
                    {isLast && stops.length > 1 && !isFirst && (
                      <span className="mt-1.5 inline-flex items-center gap-1 text-2xs tracking-[0.18em] uppercase text-gold-3">
                        <RotateCcw className="w-3 h-3" aria-hidden="true" />
                        Return
                      </span>
                    )}
                    {isFirst && isLast && (
                      <span className="mt-1.5 text-2xs tracking-[0.18em] uppercase text-gold-3">Only stop</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {active && <StopPopup active={active} />}
    </div>
  );
}
