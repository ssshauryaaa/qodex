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

const NAV_LINKS = [
  { href: '/map', label: 'Live Map' },
  { href: '/jobs', label: 'Cleanup Jobs' },
];
const LOGO_NAMES = ['MCD', 'NDMC', 'SDMC', 'EDMC', 'NMMC'];

export default function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Background video */}
      <FadingVideo
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4"
        className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0"
        style={{ width: '120%', height: '120%' }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">

        {/* AppNavbar is rendered globally from layout.tsx */}

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center pt-24 px-4 text-center">

          {/* Badge */}
          <motion.div
            {...fadeUp}
            transition={transition(0.4)}
            className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2"
          >
            <span className="bg-white text-black text-xs font-semibold font-body px-2 py-0.5 rounded-full">Live</span>
            <span className="text-sm text-white/90 font-body font-light">
              Civic waste infrastructure — built for Bharat, powered by its own workers
            </span>
          </motion.div>

          {/* Headline */}
          <div className="mt-6 max-w-3xl">
            <BlurText
              text="Turning Waste Reports Into Paid Jobs, In Minutes"
              className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.8] tracking-[-4px]"
            />
          </div>

          {/* Subtext */}
          <motion.p
            {...fadeUp}
            transition={transition(0.8)}
            className="mt-4 text-sm md:text-base text-white max-w-2xl font-body font-light leading-tight"
          >
            A citizen snaps a photo. AI triages it. A registered waste picker nearby claims the job.
            The hotspot is resolved in hours — not weeks. Every report creates a paid gig. Every
            cleanup closes the loop back to the person who filed it.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            {...fadeUp}
            transition={transition(1.1)}
            className="mt-6 flex items-center gap-6 z-20"
          >
            <Link href="/report" className="liquid-glass-strong rounded-full px-5 py-2.5 flex items-center gap-2 text-white font-body font-medium text-sm hover:brightness-110 transition-all">
              Report a Hotspot
              <ArrowUpRight size={16} />
            </Link>
            <Link href="#" className="flex items-center gap-2 text-white font-body font-light text-sm hover:text-white/80 transition-colors">
              <Play size={16} />
              Watch Demo
            </Link>
          </motion.div>

          {/* Stats cards */}
          <motion.div
            {...fadeUp}
            transition={transition(1.3)}
            className="mt-8 flex gap-4 flex-wrap justify-center"
          >
            {/* Card 1 */}
            <div className="liquid-glass p-5 w-[220px] rounded-[1.25rem]">
              <ClockIcon size={20} className="text-white/70" />
              <p className="text-4xl font-heading italic tracking-[-1px] leading-none mt-4 text-white">&lt;4 Hrs</p>
              <p className="text-xs text-white/70 font-body font-light mt-2 leading-snug">Average Hotspot Resolution Time</p>
            </div>

            {/* Card 2 */}
            <div className="liquid-glass p-5 w-[220px] rounded-[1.25rem]">
              <GlobeIcon size={20} className="text-white/70" />
              <p className="text-4xl font-heading italic tracking-[-1px] leading-none mt-4 text-white">₹200</p>
              <p className="text-xs text-white/70 font-body font-light mt-2 leading-snug">Max per-cleanup payout for waste pickers</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom trust bar */}
        <motion.div
          {...fadeUp}
          transition={transition(1.4)}
          className="flex flex-col items-center gap-4 pb-8"
        >
          <div className="liquid-glass rounded-full px-5 py-2.5">
            <span className="text-xs text-white/80 font-body font-light">
              Built for citizens · waste pickers · municipal corporations · CSR partners
            </span>
          </div>
          <div className="flex items-center gap-12 md:gap-16">
            {LOGO_NAMES.map((name) => (
              <span
                key={name}
                className="font-heading italic text-2xl md:text-3xl tracking-tight text-white/60"
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
