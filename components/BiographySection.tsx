const COURSEWORK = [
  "Operating Systems",
  "Database Systems",
  "Secure Software Design",
  "Computer Networks",
  "Analysis of Algorithms",
  "Web Programming",
];

export default function BiographySection() {
  return (
    <section id="about" className="scroll-mt-24 flex flex-col gap-6">
      <div className="section-label">
        <span className="w-1.5 h-1.5 bg-accent-gold" />
        biography
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Pull quote + story (7 cols) — 80px top padding before blockquote */}
        <div className="lg:col-span-7 flex flex-col gap-6" style={{ paddingTop: "80px" }}>
          <blockquote className="font-serif italic text-2xl sm:text-3xl text-primary-text leading-snug border-l-2 border-accent-gold pl-6">
            &ldquo;I believe security is not an overlay. It is a structural engineering requirement that must be embedded from the very first line of code.&rdquo;
          </blockquote>

          <p className="text-muted-text text-sm leading-relaxed font-sans pt-2">
            My journey into engineering didn&apos;t begin with simple web mockups; it started with a profound curiosity about how operating systems, memory blocks, and network protocols function under friction. This curiosity drove me to pursue a <strong>Bachelor of Cybersecurity</strong> at FAST NUCES Islamabad, where I specialize in systems architecture and backend integration.
          </p>

          <p className="text-muted-text text-sm leading-relaxed font-sans">
            As a developer, I focus on building resilient systems that maintain extreme high-throughput. By combining secure token authentication structures with optimized, non-blocking database queries, I engineer backends designed to be reliable from day one.
          </p>
        </div>

        {/* Academic specs card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4 w-full">
          <div className="editorial-card border border-obsidian-border p-6 rounded-sm font-mono text-xs">
            <div className="text-primary-text border-b border-obsidian-border pb-3 flex justify-between items-center">
              <span>Educational Core</span>
              <span className="text-accent-blue text-[10px]">[FAST_NUCES]</span>
            </div>

            <div className="flex flex-col gap-4 pt-3 text-muted-text">
              <div>
                <div className="text-primary-text font-serif text-sm font-bold">
                  Bachelor of Cybersecurity (BS)
                </div>
                <div className="text-[10px] mt-1 font-sans">
                  FAST National University of Computer and Emerging Sciences, Islamabad (2023 – 2027)
                </div>
              </div>

              <div className="border-t border-obsidian-border/30 pt-3 flex flex-col gap-2">
                <div className="text-primary-text font-bold uppercase tracking-wider text-[10px]">
                  Audited Coursework:
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  {COURSEWORK.map((course) => (
                    <div key={course} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-accent-gold" />
                      {course}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
