"use client";

interface NavbarProps {
  scrollProgress: number;
}

export default function Navbar({ scrollProgress }: NavbarProps) {
  return (
    <>
      {/* 2px Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-accent-gold z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Sticky Editorial Header */}
      <header className="border-b border-[#2A2A2A] bg-[#0D0D0D]/95 backdrop-blur-md sticky top-0 z-40 px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Logo: FASHI weight-600 serif, Abdullah weight-300 sans */}
            <span className="tracking-tight text-primary-text text-lg">
              <span className="font-serif font-semibold">FASHI</span>
              <span className="font-sans font-light ml-1.5">Abdullah</span>
            </span>
            <span className="hidden sm:inline text-[10px] font-mono text-muted-text border border-obsidian-border px-2 py-0.5 rounded-sm">
              BACKEND &amp; SECURITY INFRASTRUCTURE
            </span>
          </div>

          {/* Nav: 13px Inter, tracking 0.12em, 70% opacity → 100% on hover */}
          <nav className="flex items-center gap-6 font-sans text-[13px]" style={{ letterSpacing: "0.12em" }}>
            <a href="#projects" className="text-[#F0EDE8]/70 hover:text-[#F0EDE8] transition-colors uppercase">Selected Works</a>
            <a href="#experience" className="text-[#F0EDE8]/70 hover:text-[#F0EDE8] transition-colors uppercase">Chronicle</a>
            <a href="#about" className="text-[#F0EDE8]/70 hover:text-[#F0EDE8] transition-colors uppercase">Biography</a>
            <a href="#contact" className="text-[#F0EDE8]/70 hover:text-[#F0EDE8] transition-colors uppercase">Connect</a>
          </nav>
        </div>
      </header>
    </>
  );
}
