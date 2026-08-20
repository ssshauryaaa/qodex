'use client';

import FadingVideo from './FadingVideo';
import { ImageIcon, MovieIcon, LightbulbIcon } from './Icons';

const CARDS = [
  {
    icon: <ImageIcon size={20} className="text-white/90" />,
    title: 'Citizen Report',
    tags: ['Photo Upload', 'GPS Auto-pin', 'No Login', 'AI Triage'],
    body: 'Report a waste hotspot in under 30 seconds — snap a photo, location pins itself. AI confirms it\'s genuine, classifies severity, and sets a payout tier. No queue, no black hole.',
  },
  {
    icon: <MovieIcon size={20} className="text-white/90" />,
    title: 'Worker Jobs',
    tags: ['Live Nearby Jobs', 'Tap to Claim', 'Payout on Proof', 'Gig-style UX'],
    body: 'Registered waste pickers see a live list of paid cleanup jobs sorted by distance and payout. Claim with a tap, upload an after-photo, get paid — a gig platform for civic cleanup, not food delivery.',
  },
  {
    icon: <LightbulbIcon size={20} className="text-white/90" />,
    title: 'ULB Dashboard',
    tags: ['Ward Stats', 'Heatmaps', 'Resolution Time', 'CSR Tracking'],
    body: 'Municipal corporations get real operational data — average resolution time, worst recurring hotspots, ward-level performance — visibility that city governments currently have almost no way to measure.',
  },
];

export default function CapabilitiesSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black flex flex-col justify-between">
      {/* Background video */}
      <FadingVideo
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_093722_ccfc7ebf-182f-419f-8a62-2dc02db7dd9d.mp4"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-8 md:px-16 lg:px-20 pt-20 sm:pt-24 pb-12 flex flex-col min-h-screen justify-between">

        {/* Header */}
        <div className="mb-8 sm:mb-auto">
          <p className="text-xs sm:text-sm font-body text-white/80 mb-3 sm:mb-6">// How It Works</p>
          <h2
            className="font-heading italic text-4xl sm:text-5xl md:text-7xl lg:text-[5.8rem] leading-[0.95] sm:leading-[0.9] tracking-[-2px] sm:tracking-[-3px] text-white"
            style={{ whiteSpace: 'pre-line' }}
          >
            {`Three views,\none live loop`}
          </h2>
        </div>

        {/* Cards grid */}
        <div className="mt-8 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="liquid-glass rounded-[1.25rem] p-5 sm:p-6 min-h-[280px] sm:min-h-[340px] md:min-h-[360px] flex flex-col justify-between"
            >
              {/* Top row: icon + tags */}
              <div className="flex items-start justify-between gap-3">
                <div className="liquid-glass h-10 w-10 sm:h-11 sm:w-11 rounded-[0.75rem] flex items-center justify-center flex-shrink-0">
                  {card.icon}
                </div>
                <div className="flex flex-wrap gap-1 sm:gap-1.5 justify-end">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="liquid-glass rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] text-white/90 font-body whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom: title + body */}
              <div className="mt-6 sm:mt-auto">
                <h3 className="font-heading italic text-2xl sm:text-3xl md:text-4xl tracking-[-1px] leading-none text-white mb-2 sm:mb-3">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/90 font-body font-light leading-relaxed max-w-[36ch]">
                  {card.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
