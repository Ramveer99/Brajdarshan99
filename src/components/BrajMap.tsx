import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type Point = { slug: string; name: string; nameHi: string; x: number; y: number; tag: string };

const points: Point[] = [
  { slug: 'barsana', name: 'Barsana', nameHi: 'बरसाना', x: 195, y: 165, tag: 'Radha’s hill' },
  { slug: 'nandgaon', name: 'Nandgaon', nameHi: 'नन्दगाँव', x: 260, y: 210, tag: 'Nand Baba’s home' },
  { slug: 'kokilavan', name: 'Kokilavan', nameHi: 'कोकिलावन', x: 330, y: 175, tag: 'Peacock forest' },
  { slug: 'govardhan', name: 'Govardhan', nameHi: 'गोवर्धन', x: 245, y: 380, tag: 'The lifted hill' },
  { slug: 'vrindavan', name: 'Vrindavan', nameHi: 'वृन्दावन', x: 390, y: 310, tag: 'Forest of leelas' },
  { slug: 'mathura', name: 'Mathura', nameHi: 'मथुरा', x: 410, y: 410, tag: 'Birthplace' },
  { slug: 'raval', name: 'Raval', nameHi: 'रावल', x: 490, y: 390, tag: 'Birthplace of Radha' },
  { slug: 'gokul', name: 'Gokul', nameHi: 'गोकुल', x: 510, y: 445, tag: 'Cradle of Bala Krishna' },
  { slug: 'baldeo', name: 'Baldeo', nameHi: 'बलदेव', x: 560, y: 500, tag: 'Balaram’s abode' },
];

export default function BrajMap() {
  const [hover, setHover] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className="relative w-full bg-ink text-cream overflow-hidden">
      <svg viewBox="0 0 720 620" className="w-full h-auto block">
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c9a24a" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#c9a24a" stopOpacity="0" />
          </radialGradient>
          <pattern id="dots" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.6" fill="#c9a24a" opacity="0.15" />
          </pattern>
          <filter id="soft">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        <rect width="520" height="520" fill="#0b1030" />
        <rect width="520" height="520" fill="url(#dots)" />

        {/* Yamuna river - flowing SW to NE through the region */}
        <path
          d="M 380 620 C 430 540, 380 480, 480 420 C 540 380, 560 340, 620 260 C 660 200, 690 140, 720 80"
          stroke="#3b6dcf"
          strokeWidth="18"
          strokeLinecap="round"
          fill="none"
          opacity="0.35"
        />
        <path
          d="M 380 620 C 430 540, 380 480, 480 420 C 540 380, 560 340, 620 260 C 660 200, 690 140, 720 80"
          stroke="#8ab6ff"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
        <text x="600" y="180" fill="#8ab6ff" fontSize="12" fontFamily="Fraunces, serif" fontStyle="italic" opacity="0.8" transform="rotate(-42 600 180)">
          Yamunā river
        </text>

        {/* Parikrama path (dotted) */}
        <path
          d="M 195 165 Q 100 250, 145 400 Q 200 520, 350 550 Q 500 570, 590 450 Q 640 320, 520 180 Q 380 100, 195 165 Z"
          fill="none"
          stroke="#c9a24a"
          strokeWidth="1"
          strokeDasharray="3 6"
          opacity="0.55"
        />
        <text x="90" y="320" fill="#c9a24a" fontSize="10" letterSpacing="3" opacity="0.7" transform="rotate(-90 90 320)">
          BRAJ CHAURASI KOS PARIKRAMA
        </text>

        {/* Region label */}
        <text x="360" y="60" textAnchor="middle" fill="#f6efdd" fontSize="18" letterSpacing="8" fontFamily="Fraunces, serif">
          BRAJ MANDAL
        </text>
        <text x="360" y="82" textAnchor="middle" fill="#c9a24a" fontSize="11" letterSpacing="4" opacity="0.8">
          — Ut ta ra   Pra de sh —
        </text>

        {/* Ornament */}
        <g opacity="0.35">
          <circle cx="360" cy="320" r="60" fill="url(#glow)" />
          <circle cx="360" cy="320" r="2" fill="#c9a24a" />
        </g>

        {/* Points */}
        {points.map((p) => {
          const active = hover === p.slug;
          return (
            <g
              key={p.slug}
              onMouseEnter={() => setHover(p.slug)}
              onMouseLeave={() => setHover(null)}
              className="cursor-pointer"
            >
              {active && <circle cx={p.x} cy={p.y} r="22" fill="url(#glow)" />}
              <circle cx={p.x} cy={p.y} r={active ? 8 : 5} fill="#c9a24a" />
              <circle cx={p.x} cy={p.y} r={active ? 14 : 10} fill="none" stroke="#c9a24a" strokeWidth="1" opacity="0.5" />
              <text
                x={p.x}
                y={p.y - 14}
                textAnchor="middle"
                fill={active ? '#f6efdd' : '#e8c877'}
                fontSize={active ? 15 : 13}
                fontFamily="Fraunces, serif"
                className="transition-all pointer-events-none"
              >
                {p.name}
              </text>
              {active && (
                <text x={p.x} y={p.y + 22} textAnchor="middle" fill="#f6efdd" fontSize="10" letterSpacing="2" opacity="0.7" className="pointer-events-none">
                  {p.tag.toUpperCase()}
                </text>
              )}
              <rect
                x={p.x - 40}
                y={p.y - 25}
                width="80"
                height="50"
                fill="transparent"
                onClick={() => navigate(`/destinations/${p.slug}`)}
                className="cursor-pointer"
              />
            </g>
          );
        })}
      </svg>

      {/* Site index — grouped with the map for keyboard & touch users */}
      <nav
        aria-label="Sacred sites on the map"
        className="border-t border-cream/15 bg-ink-2/80 px-2 py-2 md:px-2"
      >
        <p id="map-site-hint" className="text-caption tracking-[0.2em] uppercase text-gold-2 mb-3">
          Hover or tap a name to locate it on the map
        </p>
        <ul className="flex flex-wrap gap-x-1 gap-y-2">
          {points.map((p) => (
            <li key={p.slug}>
              <Link
                to={`/destinations/${p.slug}`}
                onMouseEnter={() => setHover(p.slug)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(p.slug)}
                onBlur={() => setHover(null)}
                aria-describedby="map-site-hint"
                className="inline-block px-3 py-1.5 text-sm text-gold-2 underline decoration-gold/50 underline-offset-4 hover:text-cream hover:decoration-cream transition-colors"
              >
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}


// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// type Point = {
//   slug: string;
//   name: string;
//   nameHi: string;
//   x: number;
//   y: number;
//   tag: string;
// };

// const points: Point[] = [
//   {
//     slug: 'barsana',
//     name: 'Barsana',
//     nameHi: 'बरसाना',
//     x: 195,
//     y: 165,
//     tag: 'Radha’s hill',
//   },
//   {
//     slug: 'nandgaon',
//     name: 'Nandgaon',
//     nameHi: 'नन्दगाँव',
//     x: 260,
//     y: 210,
//     tag: 'Nand Baba’s home',
//   },
//   {
//     slug: 'kokilavan',
//     name: 'Kokilavan',
//     nameHi: 'कोकिलावन',
//     x: 330,
//     y: 175,
//     tag: 'Peacock forest',
//   },
//   {
//     slug: 'govardhan',
//     name: 'Govardhan',
//     nameHi: 'गोवर्धन',
//     x: 245,
//     y: 380,
//     tag: 'The lifted hill',
//   },
//   {
//     slug: 'vrindavan',
//     name: 'Vrindavan',
//     nameHi: 'वृन्दावन',
//     x: 390,
//     y: 310,
//     tag: 'Forest of leelas',
//   },
//   {
//     slug: 'mathura',
//     name: 'Mathura',
//     nameHi: 'मथुरा',
//     x: 395,
//     y: 430,
//     tag: 'Birthplace',
//   },
//   {
//     slug: 'raval',
//     name: 'Raval',
//     nameHi: 'रावल',
//     x: 505,
//     y: 355,
//     tag: 'Birthplace of Radha',
//   },
//   {
//     slug: 'gokul',
//     name: 'Gokul',
//     nameHi: 'गोकुल',
//     x: 535,
//     y: 470,
//     tag: 'Cradle of Bala Krishna',
//   },
//   {
//     slug: 'baldeo',
//     name: 'Baldeo',
//     nameHi: 'बलदेव',
//     x: 585,
//     y: 525,
//     tag: 'Balaram’s abode',
//   },
// ];

// export default function BrajMap() {
//   const [hover, setHover] = useState<string | null>(null);
//   const navigate = useNavigate();

//   const handleNavigate = (slug: string) => {
//     navigate(`/destinations/${slug}`);
//   };

//   const handleMarkerKeyDown = (
//     event: React.KeyboardEvent<SVGGElement>,
//     slug: string,
//   ) => {
//     if (event.key === 'Enter' || event.key === ' ') {
//       event.preventDefault();
//       handleNavigate(slug);
//     }
//   };

//   return (
//     <div className="relative w-full overflow-hidden bg-ink text-cream">
//       {/* =====================================================
//           MAP
//       ====================================================== */}
//       <svg
//         viewBox="0 0 720 620"
//         className="block h-auto w-full"
//         role="img"
//         aria-labelledby="braj-map-title braj-map-description"
//       >
//         <title id="braj-map-title">
//           Sacred sites of Braj Mandal
//         </title>

//         <desc id="braj-map-description">
//           An illustrated map showing sacred locations across
//           Braj Mandal. Select a map marker to explore a
//           destination.
//         </desc>

//         <defs>
//           {/* Gold glow */}
//           <radialGradient
//             id="glow"
//             cx="50%"
//             cy="50%"
//             r="50%"
//           >
//             <stop
//               offset="0%"
//               stopColor="#c9a24a"
//               stopOpacity="0.35"
//             />

//             <stop
//               offset="100%"
//               stopColor="#c9a24a"
//               stopOpacity="0"
//             />
//           </radialGradient>

//           {/* Background dots */}
//           <pattern
//             id="dots"
//             x="0"
//             y="0"
//             width="18"
//             height="18"
//             patternUnits="userSpaceOnUse"
//           >
//             <circle
//               cx="1"
//               cy="1"
//               r="0.6"
//               fill="#c9a24a"
//               opacity="0.15"
//             />
//           </pattern>

//           {/* Soft glow filter */}
//           <filter id="soft">
//             <feGaussianBlur stdDeviation="2" />
//           </filter>
//         </defs>

//         {/* =====================================================
//             MAP BACKGROUND
//         ====================================================== */}

//         <rect
//           width="720"
//           height="620"
//           fill="#0b1030"
//         />

//         <rect
//           width="720"
//           height="620"
//           fill="url(#dots)"
//         />

//         {/* =====================================================
//             YAMUNA RIVER
//         ====================================================== */}

//         <path
//           d="
//             M 380 620
//             C 430 540, 380 480, 480 420
//             C 540 380, 560 340, 620 260
//             C 660 200, 690 140, 720 80
//           "
//           stroke="var(--color-river-deep)"
//           strokeWidth="18"
//           strokeLinecap="round"
//           fill="none"
//           opacity="0.35"
//           aria-hidden="true"
//         />

//         <path
//           d="
//             M 380 620
//             C 430 540, 380 480, 480 420
//             C 540 380, 560 340, 620 260
//             C 660 200, 690 140, 720 80
//           "
//           stroke="var(--color-river)"
//           strokeWidth="3"
//           strokeLinecap="round"
//           fill="none"
//           opacity="0.7"
//           aria-hidden="true"
//         />

//         <text
//           x="600"
//           y="180"
//           fill="var(--color-river)"
//           fontSize="var(--text-map)"
//           fontFamily="Fraunces, serif"
//           fontStyle="italic"
//           opacity="0.8"
//           transform="rotate(-42 600 180)"
//           aria-hidden="true"
//         >
//           Yamunā river
//         </text>

//         {/* =====================================================
//             PARIKRAMA PATH
//         ====================================================== */}

//         <path
//           d="
//             M 195 165
//             Q 100 250, 145 400
//             Q 200 520, 350 550
//             Q 500 570, 590 450
//             Q 640 320, 520 180
//             Q 380 100, 195 165
//             Z
//           "
//           fill="none"
//           stroke="var(--color-gold)"
//           strokeWidth="1"
//           strokeDasharray="3 6"
//           opacity="0.55"
//           aria-hidden="true"
//         />

//         <text
//           x="48"
//           y="548"
//           fill="var(--color-gold)"
//           fontSize="var(--text-2xs)"
//           letterSpacing="3"
//           opacity="0.7"
//           aria-hidden="true"
//         >
//           BRAJ CHAURASI KOS PARIKRAMA
//         </text>

//         {/* =====================================================
//             REGION TITLE
//         ====================================================== */}

//         <text
//           x="360"
//           y="60"
//           textAnchor="middle"
//           fill="var(--color-parchment)"
//           fontSize="var(--text-map-lg)"
//           letterSpacing="8"
//           fontFamily="Fraunces, serif"
//           aria-hidden="true"
//         >
//           BRAJ MANDAL
//         </text>

//         <text
//           x="360"
//           y="82"
//           textAnchor="middle"
//           fill="var(--color-gold)"
//           fontSize="var(--text-map)"
//           letterSpacing="4"
//           opacity="0.8"
//           aria-hidden="true"
//         >
//           — Ut ta ra   Pra de sh —
//         </text>

//         {/* =====================================================
//             CENTER ORNAMENT
//         ====================================================== */}

//         <g aria-hidden="true" opacity="0.35">
//           <circle
//             cx="360"
//             cy="320"
//             r="60"
//             fill="url(#glow)"
//           />

//           <circle
//             cx="360"
//             cy="320"
//             r="2"
//             fill="var(--color-gold)"
//           />
//         </g>

//         {/* =====================================================
//             INTERACTIVE MAP MARKERS
//         ====================================================== */}

//         {points.map((p) => {
//           const active = hover === p.slug;
//           const labelY = ['raval', 'gokul'].includes(p.slug) ? p.y - 22 : p.y - 14;

//           return (
//             <g
//               key={p.slug}
//               role="button"
//               tabIndex={0}
//               className="cursor-pointer outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4 rounded-full"
//               aria-label={`${p.name}. ${p.tag}. Select to explore.`}
//               onMouseEnter={() => setHover(p.slug)}
//               onMouseLeave={() => setHover(null)}
//               onFocus={() => setHover(p.slug)}
//               onBlur={() => setHover(null)}
//               onKeyDown={(event) =>
//                 handleMarkerKeyDown(event, p.slug)
//               }
//             >
//               {/* Idle pulse halo — visible affordance without hover */}
//               {!active && (
//                 <circle
//                   cx={p.x}
//                   cy={p.y}
//                   r="14"
//                   fill="url(#glow)"
//                   className="marker-pulse"
//                   aria-hidden="true"
//                 />
//               )}

//               {/* Active glow */}
//               {active && (
//                 <circle
//                   cx={p.x}
//                   cy={p.y}
//                   r="24"
//                   fill="url(#glow)"
//                   aria-hidden="true"
//                 />
//               )}

//               {/* Main marker */}
//               <circle
//                 cx={p.x}
//                 cy={p.y}
//                 r={active ? 9 : 8}
//                 fill="var(--color-gold)"
//                 className="transition-transform duration-200"
//                 aria-hidden="true"
//               />

//               {/* Marker ring */}
//               <circle
//                 cx={p.x}
//                 cy={p.y}
//                 r={active ? 16 : 12}
//                 fill="none"
//                 stroke="var(--color-gold)"
//                 strokeWidth="1.5"
//                 opacity="0.55"
//                 aria-hidden="true"
//               />

//               {/* Location name */}
//               <text
//                 x={p.x}
//                 y={labelY}
//                 textAnchor="middle"
//                 fill={
//                   active
//                     ? 'var(--color-parchment)'
//                     : 'var(--color-gold-2)'
//                 }
//                 fontSize="var(--text-map)"
//                 fontFamily="Fraunces, serif"
//                 className="pointer-events-none transition-all"
//                 aria-hidden="true"
//               >
//                 {p.name}
//               </text>

//               {/* Location description */}
//               {active && (
//                 <text
//                   x={p.x}
//                   y={p.y + 22}
//                   textAnchor="middle"
//                   fill="var(--color-parchment)"
//                   fontSize="var(--text-2xs)"
//                   letterSpacing="2"
//                   opacity="0.7"
//                   className="pointer-events-none"
//                   aria-hidden="true"
//                 >
//                   {p.tag.toUpperCase()}
//                 </text>
//               )}

//               {/* Large invisible click target — 56×56px for touch */}
//               <rect
//                 x={p.x - 28}
//                 y={p.y - 28}
//                 width="56"
//                 height="56"
//                 fill="transparent"
//                 className="cursor-pointer"
//                 aria-hidden="true"
//                 onClick={() => handleNavigate(p.slug)}
//               />
//             </g>
//           );
//         })}
//       </svg>

//       {/* =====================================================
//           MAP LEGEND — overlaid at map bottom for proximity
//       ====================================================== */}

//       <section
//         aria-labelledby="map-sites-title"
//         className="
//           absolute
//           inset-x-0
//           bottom-0
//           bg-gradient-to-t
//           from-ink
//           via-ink/95
//           to-transparent
//           px-4
//           pb-4
//           pt-10
//           md:px-6
//         "
//       >
//         <h2 id="map-sites-title" className="sr-only">
//           Sacred sites on the map
//         </h2>

//         <p id="map-site-hint" className="sr-only">
//           Select a marker on the map to explore its story.
//         </p>

//         <ul
//           aria-label="Sacred sites shown on the map"
//           className="
//             grid
//             grid-cols-2
//             sm:grid-cols-3
//             gap-x-1.5
//             gap-y-2
//             justify-items-center
//           "
//         >
//           {points.map((p) => {
//             const active = hover === p.slug;

//             return (
//               <li key={p.slug}>
//                 <span
//                   className={`
//                     inline-flex
//                     items-center
//                     gap-2
//                     rounded-full
//                     border
//                     px-3
//                     py-1.5
//                     text-body-sm
//                     transition-all
//                     duration-200

//                     ${
//                       active
//                         ? `
//                           border-gold/70
//                           bg-gold/15
//                           text-cream
//                         `
//                         : `
//                           border-gold/20
//                           bg-gold/5
//                           text-gold-2
//                         `
//                     }
//                   `}
//                   onMouseEnter={() =>
//                     setHover(p.slug)
//                   }
//                   onMouseLeave={() =>
//                     setHover(null)
//                   }
//                 >
//                   {/* Legend dot */}
//                   <span
//                     aria-hidden="true"
//                     className={`
//                       h-1.5
//                       w-1.5
//                       shrink-0
//                       rounded-full
//                       bg-gold
//                       transition-transform
//                       duration-200

//                       ${
//                         active
//                           ? 'scale-125'
//                           : 'scale-100'
//                       }
//                     `}
//                   />

//                   {/* Site name */}
//                   <span>{p.name}</span>
//                 </span>
//               </li>
//             );
//           })}
//         </ul>
//       </section>
//     </div>
//   );
// }
