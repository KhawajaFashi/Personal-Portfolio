const NAV_LINKS = [
  { label: "Selected Works",        href: "#projects"  },
  { label: "Chronicle",            href: "#experience" },
  { label: "Biography",            href: "#about"      },
  { label: "Connect",              href: "#contact"    },
  { label: "Backend & Cybersecurity", href: "#about"   },
];

export default function Footer() {
  const hoverOn = (e: React.MouseEvent<HTMLAnchorElement>) => {
    (e.currentTarget as HTMLElement).style.color = "#F0EDE8";
  };
  const hoverOff = (e: React.MouseEvent<HTMLAnchorElement>) => {
    (e.currentTarget as HTMLElement).style.color = "#6B6B6B";
  };

  return (
    <footer style={{ background: "#0D0D0D", overflow: "hidden", position: "relative" }}>

      {/* ── Layer 1: Legal strip (top) ── */}
      <div
        style={{
          borderTop: "1px solid #2A2A2A",
          padding: "20px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: "11px",
          color: "#4A4A4A",
        }}
      >
        <span>© 2026 Khawaja Fashi ud Din Abdullah · All Rights Reserved</span>
        <span>Next.js · Tailwind CSS · Framer Motion</span>
      </div>

      {/* ── Layer 2: Nav links spread evenly across full width ── */}
      <div
        style={{
          padding: "28px 48px 0",
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "11px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            style={{ color: "#6B6B6B", textDecoration: "none", transition: "color 0.15s" }}
            onMouseEnter={hoverOn}
            onMouseLeave={hoverOff}
          >
            {label}
          </a>
        ))}
      </div>

      {/* ── Layer 3: Giant ghost "FASHI" anchored to the bottom edge ── */}
      {/* Overflows left/right; footer overflow:hidden clips it — ArchiGreen technique */}
      <div
        style={{
          position: "relative",
          height: "clamp(200px, 30vw, 375px)",
          marginTop: "8px",
          marginBottom: "2rem",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "-0.18em",
            left: "50%",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
            fontFamily: "var(--font-ibm-plex-serif), Georgia, serif",
            fontSize: "clamp(200px, 30vw, 540px)",
            fontWeight: 700,
            color: "#1C1C1C",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          FASHI
        </div>
      </div>

    </footer>
  );
}
