export default function Loading({ label = 'Loading' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-ink/60">
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border border-gold/30"></div>
        <div className="absolute inset-0 rounded-full border-t-2 border-gold animate-spin"></div>
      </div>
      <p className="mt-4 tracking-[0.25em] text-xs uppercase font-sans">{label}</p>
    </div>
  );
}
