import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-ink text-cream mt-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="font-display text-2xl sm:text-3xl tracking-[0.14em] sm:tracking-[0.2em]">BRAJ DARSHAN</div>
            <div className="font-devanagari text-gold-2 text-xl mt-2">ब्रज दर्शन</div>
            <p className="mt-4 text-cream-soft leading-relaxed font-serif text-lg italic">
              “Where every stone remembers a footstep, every wind carries a flute-note, and every dawn breaks in the colour of turmeric and rose.”
            </p>
            <div className="mt-4 flex items-center gap-3">
              {[Instagram, Twitter, Youtube, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-gold hover:text-ink hover:border-gold transition">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="text-caption tracking-[0.28em] uppercase text-gold-2 mb-5">Explore</div>
            <ul className="space-y-3 text-cream-soft">
              <li><Link to="/destinations" className="hover:text-gold-2">Destinations</Link></li>
              <li><Link to="/temples" className="hover:text-gold-2">Temples</Link></li>
              <li><Link to="/experiences" className="hover:text-gold-2">Experiences</Link></li>
              <li><Link to="/routes" className="hover:text-gold-2">Parikramas</Link></li>
              <li><Link to="/festivals" className="hover:text-gold-2">Festivals</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="text-caption tracking-[0.28em] uppercase text-gold-2 mb-5">Plan</div>
            <ul className="space-y-3 text-cream-soft">
              <li><Link to="/planner" className="hover:text-gold-2">Yatra Planner</Link></li>
              <li><Link to="/guide" className="hover:text-gold-2">Travel Guide</Link></li>
              <li><Link to="/journal" className="hover:text-gold-2">The Journal</Link></li>
              <li><a href="#" className="hover:text-gold-2">Concierge</a></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <div className="text-caption tracking-[0.28em] uppercase text-gold-2 mb-3">Braj Dispatch</div>
            <p className="text-cream-soft text-sm leading-relaxed mb-3">
              A monthly letter of festivals, seasonal parikramas, and quiet notes from Vrindavan’s ghats. No noise, only the essential.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="your@email.com"
                className="flex-1 min-w-0 bg-cream/5 border-2 border-cream/45 sm:border-r-0 px-4 py-3 text-sm focus:outline-none focus:border-gold focus:bg-cream/10"
              />
              <button className="px-6 py-3 bg-gold text-ink text-caption tracking-[0.25em] uppercase hover:bg-gold-2">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4 text-caption text-cream-muted tracking-wider">
          <div>© 2026 Braj Darshan Foundation · A cultural pilgrimage archive</div>
          <div className="font-devanagari text-gold-2 text-sm">हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे</div>
          <div>Crafted with reverence · Mathura, U.P.</div>
        </div>
      </div>
    </footer>
  );
}
