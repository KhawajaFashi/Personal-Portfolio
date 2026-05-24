"use client";

import { useState, useEffect, useRef } from "react";

import Navbar          from "@/components/Navbar";
import HeroSection     from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import BiographySection  from "@/components/BiographySection";
import ContactSection  from "@/components/ContactSection";
import Footer          from "@/components/Footer";

export default function Home() {
  // ── Scroll progress (reading indicator) ──────────────────────────────────
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) setScrollProgress((window.scrollY / totalScroll) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Query Latency simulator (HeroSection) ─────────────────────────────────
  const [promiseMode, setPromiseMode]             = useState<"sequential" | "parallel">("sequential");
  const [isSimulatingQueries, setIsSimulatingQueries] = useState(false);
  const [queryProgresses, setQueryProgresses]     = useState<number[]>(new Array(17).fill(0));
  const [latencyReadout, setLatencyReadout]       = useState(850);
  const queryTimerRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => () => { queryTimerRef.current.forEach(clearTimeout); }, []);

  const startQuerySimulation = () => {
    if (isSimulatingQueries) return;
    setIsSimulatingQueries(true);
    setQueryProgresses(new Array(17).fill(0));
    setLatencyReadout(promiseMode === "sequential" ? 850 : 230);
    queryTimerRef.current = [];

    if (promiseMode === "sequential") {
      let idx = 0;
      const next = () => {
        if (idx >= 17) { setIsSimulatingQueries(false); return; }
        let p = 0;
        const t = setInterval(() => {
          p += 25;
          setQueryProgresses((prev) => { const n = [...prev]; n[idx] = p; return n; });
          if (p >= 100) { clearInterval(t); idx++; next(); }
        }, 20);
      };
      next();
    } else {
      for (let i = 0; i < 17; i++) {
        const mult = 1.0 + Math.random() * 0.7;
        let p = 0;
        const t = setInterval(() => {
          p = Math.min(100, p + Math.floor(12 * mult));
          setQueryProgresses((prev) => { const n = [...prev]; n[i] = p; return n; });
          if (p >= 100) clearInterval(t);
        }, 30);
        if (i === 16) {
          const check = setInterval(() => {
            setQueryProgresses((prev) => {
              if (prev.every((x) => x >= 100)) { clearInterval(check); setIsSimulatingQueries(false); }
              return prev;
            });
          }, 40);
        }
      }
    }
  };

  // ── Threat / Anomaly Audit simulator (ProjectsSection) ────────────────────
  const [isThreatChecking, setIsThreatChecking] = useState(false);
  const [threatProgress, setThreatProgress]     = useState(0);
  const [threatResult, setThreatResult]         = useState<string | null>(null);

  const runThreatSimulation = () => {
    if (isThreatChecking) return;
    setIsThreatChecking(true);
    setThreatProgress(0);
    setThreatResult(null);
    let p = 0;
    const t = setInterval(() => {
      p += 10;
      setThreatProgress(p);
      if (p >= 100) {
        clearInterval(t);
        setIsThreatChecking(false);
        setThreatResult(
          "AUDIT COMPLETE: Rogue MQTT packet anomaly detected from Device ID #14. Classified as PORT_SCANNING under 300ms. Accuracy: 98.7%."
        );
      }
    }, 80);
  };

  // ── Clipboard copy (ContactSection) ──────────────────────────────────────
  const [copiedStatus, setCopiedStatus] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("fashi449623@gmail.com");
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 2500);
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="relative min-h-screen bg-obsidian-bg text-primary-text selection:bg-accent-gold selection:text-obsidian-bg flex flex-col font-sans">

      <Navbar scrollProgress={scrollProgress} />

      <main
        className="flex-1 w-full max-w-6xl mx-auto px-6 flex flex-col"
        style={{ paddingTop: "140px", paddingBottom: "100px", gap: "120px" }}
      >
        <HeroSection
          promiseMode={promiseMode}
          setPromiseMode={setPromiseMode}
          isSimulatingQueries={isSimulatingQueries}
          queryProgresses={queryProgresses}
          setQueryProgresses={setQueryProgresses}
          latencyReadout={latencyReadout}
          setLatencyReadout={setLatencyReadout}
          startQuerySimulation={startQuerySimulation}
        />

        <ProjectsSection
          isThreatChecking={isThreatChecking}
          threatProgress={threatProgress}
          threatResult={threatResult}
          runThreatSimulation={runThreatSimulation}
        />

        <ExperienceSection />

        <BiographySection />

        <ContactSection
          copiedStatus={copiedStatus}
          copyToClipboard={copyToClipboard}
        />
      </main>

      <Footer />

    </div>
  );
}
