"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Map, Briefcase, Menu, X, LayoutDashboard, Sparkles } from "lucide-react";
import { ArrowUpRight } from "@/components/landing/Icons";

const NAV_LINKS = [
  { href: "/map",       label: "Live Map",  icon: Map },
  { href: "/jobs",      label: "Jobs",       icon: Briefcase },
  { href: "/impact",    label: "Impact",     icon: Sparkles },
  { href: "/dashboard", label: "Dashboard",  icon: LayoutDashboard },
];

export default function AppNavbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  if (!mounted) return null;

  return (
    <>
      <nav
        className={`fixed top-4 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 md:px-12 pointer-events-none transition-all duration-500 ${
          scrolled ? "top-3" : "top-4"
        }`}
      >
        {/* Logo pill */}
        <Link
          href="/"
          className="pointer-events-auto liquid-glass h-10 w-10 sm:h-11 sm:w-11 rounded-full flex items-center justify-center hover:brightness-125 transition-all active:scale-95 shadow-md"
        >
          <span className="font-heading italic text-xl sm:text-2xl text-white leading-none">wy</span>
        </Link>

        {/* Center pill nav (desktop) — scrollable for many links */}
        <div className="pointer-events-auto hidden md:flex liquid-glass rounded-full px-2 py-1.5 items-center gap-0.5 shadow-lg overflow-x-auto no-scrollbar max-w-[60vw]">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`relative px-3.5 py-1.5 text-xs font-body rounded-full whitespace-nowrap transition-all duration-200 ${
                  isActive
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
            className={`ml-1 flex items-center gap-1.5 text-xs font-body rounded-full px-3.5 py-1.5 whitespace-nowrap transition-all duration-200 ${
              pathname === "/report"
                ? "bg-white/90 text-black font-semibold"
                : "bg-white text-black font-semibold hover:bg-white/90"
            }`}
          >
            Report
            <ArrowUpRight size={12} />
          </Link>
        </div>

        {/* Mobile controls (phones) */}
        <div className="pointer-events-auto flex md:hidden items-center gap-2">
          <Link
            href="/report"
            className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-body font-semibold transition-all ${
              pathname === "/report"
                ? "bg-white text-black"
                : "liquid-glass text-white hover:brightness-125"
            }`}
          >
            Report
            <ArrowUpRight size={12} />
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="liquid-glass h-9 w-9 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all active:scale-95"
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Desktop right spacer pill for symmetry */}
        <div className="pointer-events-auto hidden md:block liquid-glass h-11 w-11 rounded-full" aria-hidden="true" />
      </nav>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-4 top-16 z-50 md:hidden animate-fade-in-up">
          <div className="liquid-glass-strong rounded-2xl p-3 shadow-2xl space-y-0.5">
            {[
              { href: "/",          label: "Home",           icon: null,              badge: null },
              { href: "/map",       label: "Live Map",        icon: Map,               badge: "Real-time" },
              { href: "/jobs",      label: "Cleanup Jobs",    icon: Briefcase,         badge: "Earn Payout" },
              { href: "/impact",    label: "Live Impact",     icon: Sparkles,          badge: "Proof" },
              { href: "/dashboard", label: "Dashboard",       icon: LayoutDashboard,   badge: "ULB & CSR" },
            ].map(({ href, label, icon: Icon, badge }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-body transition-colors ${
                  pathname === href ? "bg-white/15 text-white font-semibold" : "text-white/70 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  {Icon && <Icon size={14} className="text-white/50" />}
                  <span>{label}</span>
                </div>
                {badge && <span className="text-[10px] text-white/40 font-body">{badge}</span>}
              </Link>
            ))}
            <Link
              href="/report"
              className="mt-1 flex items-center justify-center gap-1.5 bg-white text-black font-semibold text-sm rounded-xl py-2.5 shadow-md"
            >
              <span>Report a Hotspot</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
