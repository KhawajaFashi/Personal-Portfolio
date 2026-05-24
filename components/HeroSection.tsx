"use client";

import { useRef } from "react";

interface HeroSectionProps {
  promiseMode: "sequential" | "parallel";
  setPromiseMode: (m: "sequential" | "parallel") => void;
  isSimulatingQueries: boolean;
  queryProgresses: number[];
  setQueryProgresses: (p: number[]) => void;
  latencyReadout: number;
  setLatencyReadout: (v: number) => void;
  startQuerySimulation: () => void;
}

export default function HeroSection({
  promiseMode,
  setPromiseMode,
  isSimulatingQueries,
  queryProgresses,
  setQueryProgresses,
  latencyReadout,
  setLatencyReadout,
  startQuerySimulation,
}: HeroSectionProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">

      {/* ── Left Column (60%) ── */}
      <div className="lg:col-span-7 flex flex-col gap-5">
        <div className="section-label">
          <span className="w-1.5 h-1.5 bg-accent-gold" />
          overview
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-serif font-bold leading-[1.08] tracking-tight text-primary-text">
          Khawaja Fashi ud Din Abdullah
        </h1>

        <h2 className="font-mono text-xs uppercase tracking-[0.1em] text-accent-gold font-semibold">
          Backend &amp; Cybersecurity Engineer
        </h2>

        <p className="text-base text-muted-text leading-relaxed font-sans max-w-xl">
          I design high-performance server-side architectures, optimize database
          query latency, and build resilient machine learning threat detection
          models for enterprise infrastructure.
        </p>

        {/* Stat bar */}
        <div>
          <div className="border-t border-[#2A2A2A] py-4 grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono text-left">
            {[
              { label: "API Routes",   value: "113" },
              { label: "Latency Drop", value: "73%",      gold: true },
              { label: "Threat ML",    value: "<300ms" },
              { label: "Degree",       value: "BS Cyber" },
            ].map(({ label, value, gold }) => (
              <div key={label}>
                <div className="text-[10px] text-muted-text uppercase tracking-wider mb-1">{label}</div>
                <div className={`text-base font-bold ${gold ? "text-accent-gold" : "text-primary-text"}`}>
                  {value}
                </div>
              </div>
            ))}
          </div>
          <div className="h-px bg-[#2A2A2A]" />
        </div>

        <div className="flex flex-wrap gap-4 pt-1">
          <a href="#projects" className="editorial-btn-primary">View Selected Works</a>
          <a href="#contact" className="editorial-btn-secondary">Get In Touch</a>
        </div>
      </div>

      {/* ── Right Column (40%) — Query Latency Dashboard widget ── */}
      <div className="lg:col-span-5 w-full">
        <div
          className="flex flex-col gap-6 font-mono text-xs"
          style={{
            background: "#141414",
            border: "1px solid #2A2A2A",
            borderTop: "4px solid #E8C547",
            boxShadow: "0 1px 3px rgba(0,0,0,0.5)",
          }}
        >
          <div className="px-5 pt-5 pb-5 flex flex-col gap-6">
            {/* Header */}
            <div className="border-b border-obsidian-border pb-3 flex items-center justify-between">
              <span className="text-primary-text font-bold">Query Latency Index</span>
              <span className="text-[10px] text-accent-gold font-semibold">DB_METRICS</span>
            </div>

            <p className="text-muted-text leading-relaxed font-sans text-[11px]">
              Compare execution delays of 17 database requests. Sequential blocks
              wait on resources; Parallel execution resolves them concurrently.
            </p>

            {/* Mode toggle */}
            <div className="grid grid-cols-2 bg-obsidian-bg p-1 border border-obsidian-border text-[10px]">
              <button
                type="button"
                onClick={() => { setPromiseMode("sequential"); setQueryProgresses(new Array(17).fill(0)); setLatencyReadout(850); }}
                className={`py-1.5 rounded-sm transition-all cursor-pointer font-bold ${promiseMode === "sequential" ? "bg-crimson-alert text-primary-text" : "text-muted-text hover:text-primary-text"}`}
              >
                Sequential (850ms)
              </button>
              <button
                type="button"
                onClick={() => { setPromiseMode("parallel"); setQueryProgresses(new Array(17).fill(0)); setLatencyReadout(230); }}
                className={`py-1.5 rounded-sm transition-all cursor-pointer font-bold ${promiseMode === "parallel" ? "bg-accent-gold text-obsidian-bg" : "text-muted-text hover:text-primary-text"}`}
              >
                Promise.all (230ms)
              </button>
            </div>

            {/* Query visualizer */}
            <div className="flex flex-col gap-1.5 bg-[#090909] p-4 border border-obsidian-border rounded-sm">
              <div className="text-[10px] text-muted-text pb-2 border-b border-obsidian-border/50 mb-2 flex justify-between">
                <span>Pending Query Stack [1-17]</span>
                <span className="font-bold text-primary-text">Total: {latencyReadout}ms</span>
              </div>
              <div className="grid grid-cols-17 gap-1 h-20 items-end">
                {queryProgresses.map((prog, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end">
                    <div className="w-full bg-[#181818] border border-obsidian-border/80 rounded-sm relative overflow-hidden h-full flex flex-col justify-end">
                      <div
                        className={`w-full transition-all duration-75 ${promiseMode === "parallel" ? "bg-accent-gold" : "bg-crimson-alert"}`}
                        style={{ height: `${prog}%` }}
                      />
                    </div>
                    <span className="text-[7px] text-muted-text">{idx + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Run button */}
            <button
              type="button"
              onClick={startQuerySimulation}
              disabled={isSimulatingQueries}
              className={`w-full font-mono py-2 text-center rounded-sm border transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                promiseMode === "parallel"
                  ? "bg-accent-gold/10 hover:bg-accent-gold/20 border-accent-gold/40 hover:border-accent-gold text-accent-gold"
                  : "bg-crimson-alert/10 hover:bg-crimson-alert/20 border-crimson-alert/40 hover:border-crimson-alert text-crimson-alert"
              }`}
            >
              {isSimulatingQueries ? "Executing Transmissions..." : "Run Latency Audit"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
