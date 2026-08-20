"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Map, Flag, Home, Leaf, Briefcase } from "lucide-react";

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

  return (
    <nav
      className={`fixed top-4 left-1/2 z-50 -translate-x-1/2 transition-all duration-500 ease-out ${scrolled
        ? "top-3 scale-[0.97]"
        : "top-4 scale-100"
        }`}
    >
      {/* Glow halo behind the pill */}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-2xl opacity-40 bg-gradient-to-r from-marigold/60 via-teal/40 to-marigold/60 animate-pulse-glow" />

      <div
        className={`flex items-center gap-1 rounded-full border px-2 py-2 transition-all duration-500 ${scrolled
          ? "border-white/60 bg-white/75 shadow-2xl shadow-ink/10 backdrop-blur-2xl"
          : "border-white/80 bg-white/90 shadow-xl shadow-ink/8 backdrop-blur-xl"
          }`}
      >
        {/* Logo pill */}
        <Link
          href="/"
          className="group mr-2 flex items-center gap-1.5 rounded-full bg-gradient-to-br from-marigold to-marigold-dark px-3.5 py-1.5 transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-marigold/30"
        >
          <Leaf size={14} className="text-white transition-transform duration-300 group-hover:rotate-12" />
          <span className="text-[13px] font-bold tracking-tight text-white">
            WasteYatra
          </span>
        </Link>

        {/* Divider */}
        <div className="mx-1 h-5 w-px bg-stone-light/60" />

        {/* Nav links */}
        {NAV_LINKS.map(({ href, label, icon: Icon, accent }) => {
          const isActive = pathname === href;
          const isHovered = hoveredHref === href;

          return (
            <Link
              key={href}
              href={href}
              onMouseEnter={() => setHoveredHref(href)}
              onMouseLeave={() => setHoveredHref(null)}
              className={`group relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all duration-200 ${accent
                ? isActive
                  ? "bg-marigold text-white shadow-md shadow-marigold/40"
                  : "bg-marigold-light text-marigold-dark hover:bg-marigold hover:text-white hover:shadow-md hover:shadow-marigold/30"
                : isActive
                  ? "bg-ink text-white shadow-md"
                  : "text-stone hover:bg-sand hover:text-ink"
                }`}
            >
              {/* Animated highlight for non-accent active pill */}
              {isActive && !accent && (
                <span className="absolute inset-0 -z-10 rounded-full bg-ink animate-scale-in" />
              )}

              <Icon
                size={14}
                className={`transition-transform duration-300 ${isHovered ? "scale-110 rotate-6" : "scale-100 rotate-0"
                  }`}
              />
              <span>{label}</span>

              {/* Active dot indicator */}
              {isActive && (
                <span
                  className={`ml-0.5 flex h-1.5 w-1.5 rounded-full ${accent ? "bg-white/80" : "bg-marigold"
                    } animate-pop`}
                />
              )}
            </Link>
          );
        })}

        {/* Live badge */}

      </div>
    </nav>
  );
}
