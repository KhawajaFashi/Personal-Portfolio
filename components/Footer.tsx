"use client";

const NAV_LINKS = [
  { label: "Selected Works",        href: "#projects"  },
  { label: "Chronicle",            href: "#experience" },
  { label: "Biography",            href: "#about"      },
  { label: "Connect",              href: "#contact"    },
  { label: "Backend & Cybersecurity", href: "#about"   },
];

export default function Footer() {
  return (
    <footer className="bg-obsidian-bg overflow-hidden relative w-full">
      {/* ── Layer 1: Legal strip (top) ── */}
      <div
        className="border-t border-obsidian-border px-6 md:px-12 py-5 flex flex-col md:flex-row justify-between items-center gap-3 font-mono text-[11px] text-[#4A4A4A]"
      >
        <span>© 2026 Khawaja Fashi ud Din Abdullah · All Rights Reserved</span>
        <span className="text-right">Next.js · Tailwind CSS · Framer Motion</span>
      </div>

      {/* ── Layer 2: Nav links spread evenly across full width ── */}
      <div
        className="px-6 md:px-12 pt-7 pb-4 flex flex-wrap justify-between items-center gap-4 font-sans text-[11px] uppercase tracking-[0.12em]"
      >
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="text-muted-text hover:text-primary-text transition-colors duration-150 text-decoration-none focus:outline-none focus:text-accent-gold"
          >
            {label}
          </a>
        ))}
      </div>

      {/* ── Layer 3: Giant ghost "FASHI" anchored to the bottom edge ── */}
      {/* Overflows left/right; footer overflow:hidden clips it — ArchiGreen technique */}
      <div className="relative h-[200px] sm:h-[260px] md:h-[300px] lg:h-[375px] mt-2 mb-8 pointer-events-none select-none">
        <div
          aria-hidden="true"
          className="absolute bottom-[-0.18em] left-1/2 -translate-x-1/2 whitespace-nowrap font-serif text-[clamp(120px,25vw,480px)] font-bold text-[#1C1C1C] tracking-[-0.02em] leading-none"
        >
          FASHI
        </div>
      </div>
    </footer>
  );
}
