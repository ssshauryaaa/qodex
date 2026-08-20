"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Map, Briefcase } from "lucide-react";
import { ArrowUpRight } from "@/components/landing/Icons";

const NAV_LINKS = [
  { href: "/map", label: "Live Map", icon: Map },
  { href: "/jobs", label: "Cleanup Jobs", icon: Briefcase },
];

export default function AppNavbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) return null;

  return (
    <nav
      className={`fixed top-4 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 pointer-events-none transition-all duration-500 ${scrolled ? "top-3" : "top-4"
        }`}
    >
      {/* Logo pill */}
      <Link
        href="/"
        className="pointer-events-auto liquid-glass h-11 w-11 rounded-full flex items-center justify-center hover:brightness-125 transition-all active:scale-95"
      >
        <span className="font-heading italic text-2xl text-white leading-none">wy</span>
      </Link>

      {/* Center pill nav */}
      <div className="pointer-events-auto hidden md:flex liquid-glass rounded-full px-2 py-1.5 items-center gap-0.5">
        {NAV_LINKS.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`relative px-4 py-1.5 text-sm font-body rounded-full transition-all duration-200 ${isActive
                  ? "bg-white/15 text-white font-medium"
                  : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
            >
              {label}
              {isActive && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </Link>
          );
        })}
        <Link
          href="/report"
          className={`ml-1 flex items-center gap-1.5 text-sm font-body rounded-full px-4 py-1.5 transition-all duration-200 ${pathname === "/report"
              ? "bg-white/90 text-black"
              : "bg-white text-black hover:bg-white/90"
            }`}
        >
          Report
          <ArrowUpRight size={13} />
        </Link>
      </div>

      {/* Mobile right pill */}
      <div className="pointer-events-auto flex md:hidden items-center gap-2">
        <Link
          href="/report"
          className="flex items-center gap-1 liquid-glass-strong rounded-full px-3.5 py-1.5 text-xs font-body font-medium text-white hover:brightness-125 transition-all"
        >
          Report
          <ArrowUpRight size={12} />
        </Link>
      </div>

      {/* Desktop right spacer pill for symmetry */}
      <div className="pointer-events-auto hidden md:block liquid-glass h-11 w-11 rounded-full" aria-hidden="true" />
    </nav>
  );
}
