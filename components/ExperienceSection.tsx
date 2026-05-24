export default function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-24 flex flex-col gap-6">
      <div className="section-label">
        <span className="w-1.5 h-1.5 bg-accent-gold" />
        professional chronicle
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start font-sans">

        {/* Left rail — gold year marker + vertical connector line */}
        <div className="lg:col-span-3 flex lg:flex-col lg:items-end justify-between lg:justify-start gap-4 pb-4 lg:pb-0 lg:pr-8 relative">
          <div className="hidden lg:block absolute right-0 top-7 bottom-0 w-px bg-[#2A2A2A]" />
          <div>
            <div
              className="font-mono font-bold tracking-wider"
              style={{ color: "#E8C547", fontSize: "18px" }}
            >
              2026
            </div>
            <div className="text-muted-text text-xs font-mono font-normal mt-1">Mar — Present</div>
          </div>
        </div>

        {/* Right: role details + bullet list */}
        <div
          className="lg:col-span-9 flex flex-col gap-4 text-muted-text"
          style={{ fontSize: "14px", lineHeight: "1.7" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <h3 className="font-serif text-xl font-bold text-primary-text">Backend Developer (Node.js)</h3>
            <span className="font-mono text-xs text-primary-text font-semibold uppercase tracking-wider">
              QUEM Systems International
            </span>
          </div>

          <ul className="list-disc list-outside pl-5" style={{ fontSize: "14px", lineHeight: "1.8" }}>
            {[
              <>Developed and maintained server-side applications in Node.js (Express), implementing a 4-tier Role-Based Access Control (RBAC) authorization system built on cryptographically signed <strong>HS256 JWT</strong>, protecting 113 API routes across subscriber, brand, and admin tiers.</>,
              <>Created and managed RESTful APIs including a per-giveaway analytics endpoint serving time-series entry data, step completion rankings, and top-10 referrer breakdowns—all computed efficiently server-side.</>,
              <>Integrated frontend with backend via a custom client-side <strong>Axios Interceptor loop</strong> that refreshes expired JWTs on 401 response codes, holds in-flight requests in a transient stack, replays them upon secure token refresh success, and dispatches a Redux logout routine on failure.</>,
              <>Worked with databases (PostgreSQL and MongoDB) by parallelizing 17 queries using <strong>Promise.all</strong>, serving subscription metrics, social authorization counts across 7 platforms, and giveaway totals without sequential blocking. Optimized API fetch latency by <strong>73%</strong>.</>,
            ].map((item, i) => (
              <li key={i} style={{ marginBottom: "10px" }}>{item}</li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
