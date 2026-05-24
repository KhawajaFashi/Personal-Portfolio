"use client";

const PIPELINE_NODES = [
  { label: "IoT Devices",     sub: "20+ sensors",     accent: false },
  { label: "MQTT Broker",     sub: "live streaming",   accent: true  },
  { label: "Node.js Pipeline",sub: "feature caching",  accent: false },
  { label: "ML Classifier",   sub: "Random Forest",    accent: true  },
  { label: "Alert Dispatch",  sub: "< 15s latency",    accent: false },
];

interface ProjectsSectionProps {
  isThreatChecking: boolean;
  threatProgress: number;
  threatResult: string | null;
  runThreatSimulation: () => void;
}

export default function ProjectsSection({
  isThreatChecking,
  threatProgress,
  threatResult,
  runThreatSimulation,
}: ProjectsSectionProps) {
  return (
    <section id="projects" className="scroll-mt-24 flex flex-col gap-6">
      <div className="section-label">
        <span className="w-1.5 h-1.5 bg-accent-gold" />
        selected works
      </div>

      {/* Project card: 40px padding, 4px gold top accent */}
      <div
        className="flex flex-col gap-6"
        style={{
          background: "#141414",
          border: "1px solid #2A2A2A",
          borderTop: "4px solid #E8C547",
          boxShadow: "0 1px 3px rgba(0,0,0,0.5)",
          padding: "40px",
        }}
      >
        {/* Card header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#2A2A2A] pb-5">
          <h3 className="font-serif text-2xl font-bold text-primary-text">
            IoT Rogue Traffic Detection System
          </h3>
          <span className="font-mono text-xs text-accent-blue font-semibold uppercase tracking-wider">
            Python · Node.js · MQTT · Scikit-learn
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left: Problem / Solution / Impact */}
          <div className="lg:col-span-7 flex flex-col gap-6 font-sans text-muted-text text-sm leading-relaxed">
            {[
              {
                heading: "Problem",
                body: "Standard IoT networks suffer from data ingestion blockages. Sequential polling of device logs creates critical latency gaps exceeding <strong>5 minutes</strong> before warnings are generated, exposing networks to aggressive port scanning.",
              },
              {
                heading: "Solution",
                body: "I engineered a high-throughput MQTT ingestion pipeline in Node.js and Python that digests real-time packet metadata from 20+ simulated IoT devices simultaneously. Built in-memory feature caching to bypass redundant calculations.",
              },
              {
                heading: "Impact",
                body: "Trained a Scikit-learn Random Forest classifier on <strong>350,000+</strong> records (IoT-23 dataset) to detect abnormal beacon frequencies. Latency drops from 5 minutes to <strong>&lt; 15 seconds</strong>, maintaining classification accuracy above <strong>95%</strong>.",
              },
            ].map(({ heading, body }) => (
              <div key={heading}>
                <h4
                  className="font-mono font-bold uppercase mb-2"
                  style={{ color: "#E8C547", fontSize: "11px", letterSpacing: "0.15em" }}
                >
                  {heading}
                </h4>
                <p dangerouslySetInnerHTML={{ __html: body }} />
              </div>
            ))}
          </div>

          {/* Right: Animated pipeline diagram + anomaly audit */}
          <div className="lg:col-span-5 flex flex-col gap-4 w-full">

            {/* Pipeline flow diagram */}
            <div className="bg-[#0A0A0A] border border-[#2A2A2A] p-5">
              <div className="text-[10px] font-mono text-muted-text pb-2 border-b border-[#2A2A2A] mb-5 flex justify-between items-center">
                <span>System Pipeline</span>
                <span className="text-accent-blue">LIVE SCHEMA</span>
              </div>
              <div className="flex flex-col items-center gap-0">
                {PIPELINE_NODES.map((node, i) => (
                  <div key={i} className="flex flex-col items-center w-full">
                    <div
                      className="w-full flex items-center justify-between px-4 py-2.5"
                      style={{
                        background: "#141414",
                        border: `1px solid ${node.accent ? "#E8C547" : "#2A2A2A"}`,
                      }}
                    >
                      <span
                        className="font-mono text-[11px] font-semibold"
                        style={{ color: node.accent ? "#E8C547" : "#F0EDE8" }}
                      >
                        {node.label}
                      </span>
                      <span className="font-mono text-[9px] text-muted-text">{node.sub}</span>
                    </div>
                    {i < 4 && (
                      <div className="flex flex-col items-center" style={{ height: "24px" }}>
                        <div className="w-px flex-1 bg-[#E8C547] opacity-40" />
                        <svg width="8" height="6" viewBox="0 0 8 6" className="flex-shrink-0">
                          <path d="M4 6L0 0h8z" fill="#E8C547" fillOpacity="0.6" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Anomaly audit bar */}
            <div className="bg-[#0A0A0A] border border-[#2A2A2A] p-4 font-mono text-[10px]">
              <div className="flex justify-between items-center text-muted-text pb-2 border-b border-[#2A2A2A] mb-3">
                <span>MQTT Anomaly Inspection</span>
                <button
                  type="button"
                  onClick={runThreatSimulation}
                  disabled={isThreatChecking}
                  className="text-accent-gold hover:underline cursor-pointer disabled:opacity-40 transition-colors"
                >
                  {isThreatChecking ? "Inspecting..." : "Execute Audit"}
                </button>
              </div>
              <div className="h-[3px] bg-[#0D0D0D] overflow-hidden" style={{ border: "1px solid #2A2A2A" }}>
                <div
                  className="h-full bg-accent-gold transition-all duration-150"
                  style={{ width: isThreatChecking ? `${threatProgress}%` : threatResult ? "100%" : "0%" }}
                />
              </div>
              {threatResult && (
                <div
                  className="mt-3 text-[10px] text-accent-gold leading-relaxed font-sans p-2.5"
                  style={{ background: "rgba(232,197,71,0.05)", border: "1px solid rgba(232,197,71,0.2)" }}
                >
                  {threatResult}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
