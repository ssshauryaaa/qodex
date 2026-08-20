"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Map, Flag, Home, Briefcase, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/map", label: "Live Map", icon: Map },
  { href: "/jobs", label: "Cleanup Jobs", icon: Briefcase },
  { href: "/report", label: "Report", icon: Flag, accent: true },
];

export default function FloatingNavbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide on home since the landing page has its own built-in hero navbar
  if (pathname === "/") return null;

  return (
    <nav
      className={`fixed top-4 left-1/2 z-50 -translate-x-1/2 transition-all duration-500 ease-out ${
        scrolled ? "top-3 scale-[0.97]" : "top-4 scale-100"
      }`}
    >
      {/* Subtle glow halo behind the pill */}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-2xl opacity-30 bg-gradient-to-r from-white/20 via-white/10 to-white/20 animate-pulse-glow" />

      <div className="liquid-glass rounded-full px-2 py-1.5 flex items-center gap-1.5 shadow-2xl backdrop-blur-2xl">
        {/* Logo pill */}
        <Link
          href="/"
          className="group flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:scale-105 hover:bg-white/20"
        >
          <span className="font-heading italic text-lg leading-none">a</span>
        </Link>

        {/* Divider */}
        <div className="h-4 w-px bg-white/10 mx-0.5" />

        {/* Nav links */}
        {NAV_LINKS.map(({ href, label, icon: Icon, accent }) => {
          const isActive = pathname === href;
          const isHovered = hoveredHref === href;

          if (accent) {
            return (
              <Link
                key={href}
                href={href}
                className="ml-1 flex items-center gap-1.5 rounded-full bg-white text-black px-3.5 py-1.5 text-xs font-body font-semibold transition-all duration-200 hover:bg-white/90 hover:scale-105 active:scale-95 shadow-sm"
              >
                <span>{label}</span>
                <ArrowUpRight size={13} />
              </Link>
            );
          }

          return (
            <Link
              key={href}
              href={href}
              onMouseEnter={() => setHoveredHref(href)}
              onMouseLeave={() => setHoveredHref(null)}
              className={`relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-body transition-all duration-200 ${
                isActive
                  ? "bg-white/15 text-white font-medium shadow-xs"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon
                size={13}
                className={`transition-transform duration-300 ${
                  isHovered ? "scale-110" : "scale-100"
                }`}
              />
              <span>{label}</span>

              {/* Active indicator dot */}
              {isActive && (
                <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
