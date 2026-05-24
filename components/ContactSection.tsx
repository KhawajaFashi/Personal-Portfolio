"use client";

import { useState } from "react";

interface ContactSectionProps {
  copiedStatus: boolean;
  copyToClipboard: () => void;
}

export default function ContactSection({ copiedStatus, copyToClipboard }: ContactSectionProps) {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormStatus("sending");
    // Simulate high-density secure payload transfer
    setTimeout(() => {
      setFormStatus("success");
      setFormData({ name: "", email: "", message: "" });
      // Reset status back to idle after 4 seconds
      setTimeout(() => setFormStatus("idle"), 4000);
    }, 1500);
  };

  return (
    <section id="contact" className="scroll-mt-24 border-t border-[#2A2A2A] pt-12 w-full">
      {/* Section label */}
      <div className="section-label mb-10">
        <span className="w-1.5 h-1.5 bg-accent-gold" />
        connect
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-20 items-start">
        {/* ── Left Column: headline + descriptor + stacked contact pills (40% width on desktop) ── */}
        <div className="md:col-span-2 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="font-serif font-bold text-primary-text text-4xl sm:text-5xl lg:text-[52px] leading-[1.05] tracking-tight">
              Let&apos;s work.
            </h2>
            <p className="text-muted-text font-sans text-sm leading-relaxed max-w-sm">
              Available for backend consulting, high-throughput systems design, and security architecture contracts.
            </p>
          </div>

          {/* Stacked pills — 48px tall, 1px border, hover fills gold */}
          <div className="flex flex-col gap-2.5">
            {/* Email pill */}
            <button
              type="button"
              onClick={copyToClipboard}
              className={`h-[48px] px-5 border rounded-[2px] font-mono text-xs tracking-wider flex items-center gap-3 w-full text-left transition-all duration-150 outline-none focus-visible:ring-1 focus-visible:ring-accent-gold ${
                copiedStatus
                  ? "bg-accent-gold text-obsidian-bg border-accent-gold"
                  : "bg-transparent text-primary-text border-obsidian-border hover:bg-accent-gold hover:text-obsidian-bg hover:border-accent-gold focus:border-accent-gold"
              }`}
              title="Click to copy email address"
            >
              <span className="opacity-50 text-[10px]">✉</span>
              <span>{copiedStatus ? "✓ EMAIL COPIED" : "fashi449623@gmail.com"}</span>
            </button>

            {/* GitHub pill */}
            <a
              href="https://github.com/KhawajaFashi"
              target="_blank"
              rel="noreferrer"
              className="h-[48px] px-5 border border-obsidian-border rounded-[2px] font-mono text-xs tracking-wider flex items-center gap-3 text-primary-text decoration-none transition-all duration-150 outline-none hover:bg-accent-gold hover:text-obsidian-bg hover:border-accent-gold focus:border-accent-gold focus-visible:ring-1 focus-visible:ring-accent-gold"
            >
              <span className="opacity-50 text-[10px]">⌥</span>
              <span>github.com/KhawajaFashi</span>
            </a>

            {/* LinkedIn pill */}
            <a
              href="https://www.linkedin.com/in/khawaja-fashi-ud-din-abdullah"
              target="_blank"
              rel="noreferrer"
              className="h-[48px] px-5 border border-obsidian-border rounded-[2px] font-mono text-xs tracking-wider flex items-center gap-3 text-primary-text decoration-none transition-all duration-150 outline-none hover:bg-accent-gold hover:text-obsidian-bg hover:border-accent-gold focus:border-accent-gold focus-visible:ring-1 focus-visible:ring-accent-gold"
            >
              <span className="opacity-50 text-[10px]">in</span>
              <span>linkedin.com/in/fashi</span>
            </a>
          </div>
        </div>

        {/* ── Right Column: Contact form (60% width on desktop) ── */}
        <form onSubmit={handleSubmit} className="md:col-span-3 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-mono text-[11px] text-muted-text uppercase tracking-[0.15em]">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={handleInputChange}
              disabled={formStatus === "sending"}
              placeholder="e.g. Marcus Aurelius"
              className="font-sans bg-obsidian-card border border-obsidian-border rounded-[2px] px-4 py-3.5 text-sm text-primary-text placeholder-muted-text/30 transition-all duration-150 outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold/20 disabled:opacity-40"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-mono text-[11px] text-muted-text uppercase tracking-[0.15em]">
              Your Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              disabled={formStatus === "sending"}
              placeholder="e.g. marcus@rome.gov"
              className="font-sans bg-obsidian-card border border-obsidian-border rounded-[2px] px-4 py-3.5 text-sm text-primary-text placeholder-muted-text/30 transition-all duration-150 outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold/20 disabled:opacity-40"
            />
          </div>

          {/* Textarea */}
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="font-mono text-[11px] text-muted-text uppercase tracking-[0.15em]">
              What Are You Building?
            </label>
            <textarea
              id="message"
              rows={4}
              required
              value={formData.message}
              onChange={handleInputChange}
              disabled={formStatus === "sending"}
              placeholder="Describe your systems architecture, tech stack, or consulting timeline..."
              className="font-sans bg-obsidian-card border border-obsidian-border rounded-[2px] px-4 py-3.5 text-sm text-primary-text placeholder-muted-text/30 transition-all duration-150 outline-none resize-none leading-relaxed focus:border-accent-gold focus:ring-1 focus:ring-accent-gold/20 disabled:opacity-40"
            />
          </div>

          {/* Submit button / Feedback states */}
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={formStatus === "sending"}
              className="w-full h-[52px] bg-accent-gold text-obsidian-bg font-mono text-xs font-semibold uppercase tracking-[0.1em] rounded-[2px] cursor-pointer transition-all duration-150 hover:opacity-85 focus:ring-2 focus:ring-accent-gold/40 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {formStatus === "sending" ? "TRANSMITTING..." : "SEND MESSAGE"}
            </button>

            {/* High-fidelity system log feedback */}
            {formStatus === "success" && (
              <div className="font-mono text-[10px] text-accent-gold border border-accent-gold/30 bg-accent-gold/5 p-3 rounded-[2px] flex items-center gap-2 animate-fade-in">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-ping" />
                <span>PAYLOAD SECURELY DISPATCHED. THANK YOU, I WILL RESPOND SHORTLY.</span>
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
