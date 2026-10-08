import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Search, ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const destinations = [
  { slug: 'mathura', name: 'Mathura', tag: 'Birthplace of Krishna' },
  { slug: 'vrindavan', name: 'Vrindavan', tag: 'The forest of leelas' },
  { slug: 'barsana', name: 'Barsana', tag: 'Radha’s beloved village' },
  { slug: 'nandgaon', name: 'Nandgaon', tag: 'Home of Nand Baba' },
  { slug: 'govardhan', name: 'Govardhan', tag: 'The lifted hill' },
  { slug: 'kokilavan', name: 'Kokilavan', tag: 'Shani’s peacock grove' },
  { slug: 'gokul', name: 'Gokul', tag: 'Cradle of Bala Krishna' },
  { slug: 'baldeo', name: 'Baldeo', tag: 'The elder brother’s abode' },
  { slug: 'raval', name: 'Raval', tag: 'Birthplace of Radha' },
];

const nav = [
  { to: '/destinations', label: 'Destinations', mega: true },
  { to: '/experiences', label: 'Experiences' },
  { to: '/routes', label: 'Routes' },
  { to: '/planner', label: 'Yatra Planner' },
  { to: '/guide', label: 'Travel Guide' },
  { to: '/journal', label: 'Journal' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [mounted, setMounted] = useState(false);
  const loc = useLocation();
  // Cream nav text is only readable over a dark hero. Journal index and 404 open on parchment.
  const darkTop =
    loc.pathname === '/' ||
    loc.pathname.startsWith('/destinations') ||
    loc.pathname.startsWith('/temples') ||
    loc.pathname === '/experiences' ||
    loc.pathname === '/routes' ||
    loc.pathname === '/planner' ||
    loc.pathname === '/guide' ||
    loc.pathname === '/festivals' ||
    /^\/journal\/.+/.test(loc.pathname);
  const solid = scrolled || !darkTop;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); setMega(false); }, [loc.pathname]);

  const header = (
    <header
      role="banner"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        solid
          ? 'bg-cream/85 backdrop-blur-xl border-b border-ink/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className={`flex items-center justify-between gap-3 transition-all ${scrolled ? 'h-16' : 'h-16 sm:h-20'}`}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0">
              <svg viewBox="0 0 40 40" className="w-full h-full">
                <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" strokeWidth="0.75" className={solid ? 'text-ink/70' : 'text-cream/90'} />
                <circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gold" />
                <path d="M20 8 C 24 14, 24 26, 20 32 C 16 26, 16 14, 20 8 Z" fill="currentColor" className="text-gold" />
                <circle cx="20" cy="20" r="2" fill="currentColor" className={solid ? 'text-ink' : 'text-cream'} />
              </svg>
            </div>
            <div className="leading-tight">
              <div className={`font-display text-sm sm:text-lg xl:text-xl tracking-[0.08em] sm:tracking-[0.16em] xl:tracking-[0.22em] whitespace-nowrap ${solid ? 'text-ink' : 'text-cream'}`}>BRAJ DARSHAN</div>
              <div className={`text-[9px] sm:text-2xs tracking-[0.12em] sm:tracking-[0.22em] xl:tracking-[0.28em] uppercase whitespace-nowrap ${solid ? 'text-ink-muted' : 'text-cream-soft'}`}>— Uttar Pradesh, Bhārat</div>
            </div>
          </Link>

          {/* Desktop Nav — full labels only fit once the viewport is wide */}
          <nav
            className="hidden xl:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {nav.map((item) => (
              <div
                key={item.to}
                className="relative"
                onMouseEnter={() => item.mega && setMega(true)}
                onMouseLeave={() => item.mega && setMega(false)}
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `px-4 h-10 text-ui tracking-[0.12em] font-medium whitespace-nowrap flex items-center gap-1 transition-colors ${
                      solid ? 'text-ink hover:text-gold-3' : 'text-cream hover:text-gold-2'
                    } ${isActive ? 'text-gold-3!' : ''}`
                  }
                >
                  {item.label}
                  {item.mega && <ChevronDown className="w-3.5 h-3.5 opacity-60" />}
                </NavLink>

                {item.mega && (
                  <AnimatePresence>
                    {mega && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.25 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                      >
                        <div className="w-[720px] bg-cream border border-ink/10 shadow-2xl rounded-sm overflow-hidden">
                          <div className="grid grid-cols-3">
                            {destinations.map((d) => (
                              <Link
                                key={d.slug}
                                to={`/destinations/${d.slug}`}
                                className="px-5 py-4 border-r border-b border-ink/5 hover:bg-parchment/60 transition group"
                              >
                                <div className="font-serif text-lg text-ink group-hover:text-gold-3">{d.name}</div>
                                <div className="text-caption uppercase tracking-[0.15em] text-ink-muted mt-1">{d.tag}</div>
                              </Link>
                            ))}
                          </div>
                          <div className="bg-ink text-cream px-5 py-3 flex items-center justify-between">
                            <span className="text-caption tracking-[0.25em] uppercase text-cream-soft">The nine sacred forests of Braj</span>
                            <Link to="/destinations" className="text-caption tracking-[0.25em] uppercase text-gold-2 hover:text-cream">View all →</Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              aria-label="Search"
              className={`hidden sm:inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                solid
                  ? 'text-ink/70 hover:text-ink hover:bg-ink/5'
                  : 'text-cream/85 hover:text-cream hover:bg-cream/10'
              }`}
            >
              <Search className="w-[18px] h-[18px]" strokeWidth={1.75} />
            </button>
            <Link
              to="/planner"
              className="group hidden xl:inline-flex items-center gap-2 h-10 px-4 bg-gold text-ink text-ui tracking-[0.12em] font-medium whitespace-nowrap hover:bg-gold-2 transition-colors"
            >
              Plan your yatra
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <button
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className={`xl:hidden flex items-center justify-center w-10 h-10 rounded-full border ${solid ? 'border-ink/20 text-ink' : 'border-cream/50 text-cream'}`}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-cream border-t border-ink/10 overflow-hidden"
          >
            <div className="px-4 sm:px-6 py-6 space-y-1 max-h-[80vh] overflow-y-auto">
              {nav.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  className={({ isActive }) =>
                    `block py-3 border-b border-ink/5 font-serif text-lg ${isActive ? 'text-gold-3' : 'text-ink'}`
                  }
                >
                  {n.label}
                </NavLink>
              ))}
              <Link to="/planner" className="btn-yatra !bg-ink !border-ink !text-cream mt-4 w-full xl:hidden">
                Plan your yatra
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <div className="pt-4 text-caption tracking-[0.25em] uppercase text-ink-muted">Destinations</div>
              {destinations.map((d) => (
                <Link key={d.slug} to={`/destinations/${d.slug}`} className="block py-2 text-ink/80 hover:text-gold-3">
                  {d.name} <span className="text-ink/40">— {d.tag}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );

  if (!mounted) return null;
  return createPortal(header, document.body);
}
