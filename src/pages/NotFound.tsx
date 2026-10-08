import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-cream px-6">
      <div className="text-center max-w-md">
        <div className="font-devanagari text-gold-3 text-4xl mb-4">क्षमायाच्छामि</div>
        <div className="font-display text-6xl text-ink">404</div>
        <p className="mt-4 font-serif text-lg text-ink/70 italic">This path is not marked on our map of Braj.</p>
        <Link to="/" className="mt-8 inline-flex items-center gap-2 bg-ink text-cream px-6 py-3 text-[11px] tracking-[0.25em] uppercase">Return home</Link>
      </div>
    </div>
  );
}
