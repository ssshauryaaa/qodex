'use client';

import { motion } from 'framer-motion';
import FadingVideo from './FadingVideo';
import BlurText from './BlurText';
import { ArrowUpRight, Play, ClockIcon, GlobeIcon } from './Icons';

import Link from 'next/link';

const fadeUp = {
  initial: { filter: 'blur(10px)', opacity: 0, y: 20 },
  animate: { filter: 'blur(0px)', opacity: 1, y: 0 },
};

const transition = (delay: number) => ({
  duration: 0.8,
  delay,
  ease: 'easeOut' as const,
});

const LOGO_NAMES = ['MCD', 'NDMC', 'SDMC', 'EDMC', 'NMMC'];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen lg:h-screen overflow-hidden bg-black flex flex-col justify-between">
      {/* Background video */}
      <FadingVideo
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4"
        className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0"
        style={{ width: '120%', height: '120%' }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full min-h-screen pt-20 sm:pt-24 pb-8 px-4 sm:px-8">

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center my-auto py-8">

          {/* Badge */}
          <motion.div
            {...fadeUp}
            transition={transition(0.4)}
            className="liquid-glass rounded-full px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-2 max-w-[95%] sm:max-w-none text-left sm:text-center"
          >
            <span className="bg-white text-black text-[10px] sm:text-xs font-semibold font-body px-2 py-0.5 rounded-full shrink-0">Live</span>
            <span className="text-xs sm:text-sm text-white/90 font-body font-light truncate sm:whitespace-normal">
              Civic waste infrastructure — built for Bharat, powered by its own workers
            </span>
          </motion.div>

          {/* Headline */}
          <div className="mt-5 sm:mt-6 max-w-4xl px-2">
            <BlurText
              text="Turning Waste Reports Into Paid Jobs, In Minutes"
              className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.2rem] font-heading italic text-white leading-[0.95] sm:leading-[0.88] tracking-[-2px] sm:tracking-[-3px] lg:tracking-[-4px]"
            />
          </div>

          {/* Subtext */}
          <motion.p
            {...fadeUp}
            transition={transition(0.8)}
            className="mt-4 text-xs sm:text-sm md:text-base text-white/90 max-w-2xl font-body font-light leading-relaxed px-2"
          >
            A citizen snaps a photo. AI triages it. A registered waste picker nearby claims the job.
            The hotspot is resolved in hours — not weeks. Every report creates a paid gig. Every
            cleanup closes the loop back to the person who filed it.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            {...fadeUp}
            transition={transition(1.1)}
            className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 z-20"
          >
            <Link href="/report" className="liquid-glass-strong rounded-full px-5 py-2.5 flex items-center gap-2 text-white font-body font-medium text-xs sm:text-sm hover:brightness-110 transition-all shadow-lg active:scale-95">
              Report a Hotspot
              <ArrowUpRight size={15} />
            </Link>
            <Link href="/map" className="flex items-center gap-2 text-white/80 font-body font-light text-xs sm:text-sm hover:text-white transition-colors">
              <Play size={14} />
              Explore Live Map
            </Link>
          </motion.div>

          {/* Stats cards */}
          <motion.div
            {...fadeUp}
            transition={transition(1.3)}
            className="mt-7 sm:mt-8 flex gap-3 sm:gap-4 flex-wrap justify-center w-full max-w-xl"
          >
            {/* Card 1 */}
            <div className="liquid-glass p-4 sm:p-5 flex-1 min-w-[140px] sm:min-w-[180px] max-w-[220px] rounded-[1.25rem] text-left">
              <ClockIcon size={18} className="text-white/70" />
              <p className="text-3xl sm:text-4xl font-heading italic tracking-[-1px] leading-none mt-3 text-white">&lt;4 Hrs</p>
              <p className="text-[11px] sm:text-xs text-white/70 font-body font-light mt-1.5 leading-snug">Average Resolution Time</p>
            </div>

            {/* Card 2 */}
            <div className="liquid-glass p-4 sm:p-5 flex-1 min-w-[140px] sm:min-w-[180px] max-w-[220px] rounded-[1.25rem] text-left">
              <GlobeIcon size={18} className="text-white/70" />
              <p className="text-3xl sm:text-4xl font-heading italic tracking-[-1px] leading-none mt-3 text-white">₹200</p>
              <p className="text-[11px] sm:text-xs text-white/70 font-body font-light mt-1.5 leading-snug">Max Payout per Cleanup</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom trust bar */}
        <motion.div
          {...fadeUp}
          transition={transition(1.4)}
          className="flex flex-col items-center gap-3 pb-2 text-center"
        >
          <div className="liquid-glass rounded-full px-4 py-1.5 max-w-full">
            <span className="text-[11px] sm:text-xs text-white/80 font-body font-light">
              Built for citizens · waste pickers · municipal corporations · CSR partners
            </span>
          </div>
          <div className="flex items-center justify-center flex-wrap gap-6 sm:gap-12 md:gap-16">
            {LOGO_NAMES.map((name) => (
              <span
                key={name}
                className="font-heading italic text-xl sm:text-2xl md:text-3xl tracking-tight text-white/60"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
