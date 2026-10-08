import type { ReactNode } from 'react';

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: 'left' | 'center';
  dark?: boolean;
};

export default function SectionHeading({ eyebrow, title, subtitle, align = 'left', dark = false }: Props) {
  const alignCls = align === 'center' ? 'text-center mx-auto' : 'text-left';
  const eyebrowCls = dark ? 'text-gold-2' : 'text-gold-3';
  const titleCls = dark ? 'text-cream' : 'text-ink';
  const subCls = dark ? 'text-cream-soft' : 'text-ink-muted';
  return (
    <div className={`${alignCls} max-w-3xl`}>
      {eyebrow && (
        <div className={`text-caption tracking-[0.35em] uppercase ${eyebrowCls} mb-4 ${align === 'center' ? 'ornament' : ''}`}>
          {eyebrow}
        </div>
      )}
      <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] ${titleCls}`}>{title}</h2>
      {subtitle && <p className={`mt-6 font-serif italic text-lg md:text-xl ${subCls}`}>{subtitle}</p>}
    </div>
  );
}
