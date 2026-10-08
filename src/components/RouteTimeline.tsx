import { Flag, RotateCcw } from 'lucide-react';

type Props = {
  stops: string[];
};

export default function RouteTimeline({ stops }: Props) {
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

      {/* Vertical timeline — mobile & narrow viewports */}
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

              <div
                className={`relative z-10 mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-semibold tabular-nums ${
                  isMilestone
                    ? 'border-gold bg-gold/15 text-gold-3'
                    : 'border-ink/15 bg-cream text-ink/55'
                }`}
              >
                {idx + 1}
              </div>

              <div className="min-w-0 pt-0.5">
                <div className="font-serif text-body-sm text-ink/90 leading-snug">{stop}</div>
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

      {/* Horizontal stepper — tablet and up */}
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

              return (
                <li key={`${stop}-${idx}`} className="group flex flex-1 min-w-0">
                  <div className="flex flex-col items-center text-center w-full px-1">
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
                        className={`relative z-10 flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 text-[10px] font-semibold tabular-nums transition-colors group-hover:border-gold group-hover:bg-gold/10 ${
                          isMilestone
                            ? 'border-gold bg-gold/15 text-gold-3'
                            : 'border-ink/15 bg-cream text-ink/55'
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
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
