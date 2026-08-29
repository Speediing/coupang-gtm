import { CompareTable } from "@/components/CompareTable";
import { HeroDemo } from "@/components/HeroDemo";
import { HeroTelemetry } from "@/components/HeroTelemetry";
import { JobSection } from "@/components/JobSection";
import { QuoteWall } from "@/components/QuoteWall";
import { RosterChart } from "@/components/RosterChart";
import { SiteNav } from "@/components/SiteNav";
import { JOBS } from "@/data/jobs";

export default function HomePage() {
  return (
    <main id="top">
      <div className="hero-watercolor">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="hero-watercolor-image"
          src="/brand/coupang-watercolor.webp"
          alt=""
        />
        <SiteNav />
      </div>

      <div className="report">
        <div className="report-hero">
          <HeroTelemetry />
          <section className="hero">
            <HeroDemo />
          </section>

          <RosterChart />

          <section className="usecase-framing">
            <p className="eyebrow">Three illustrative workflows</p>
            <h2>
              Start with the work between reviews. Let agents gather the
              sources, draft the artifact, and keep the open items visible.
            </h2>
            <p>
              These examples use public account context. They are not a record
              of Coupang discovery.
            </p>
          </section>

          <div className="metric-grid">
            {JOBS.map((job) => (
              <a
                key={job.id}
                className="metric-card"
                href={`#${job.id}`}
              >
                <div className="metric-card-top">
                  <p>Sample {String(job.number).padStart(2, "0")}</p>
                </div>
                <h2>{job.title}</h2>
                <p className="metric-trigger">Starts when {job.trigger.toLowerCase()}</p>
              </a>
            ))}
          </div>
        </div>

        <div id="jobs">
          {JOBS.map((job) => (
            <JobSection key={job.id} job={job} />
          ))}
        </div>
      </div>

      <div className="orbit-break" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/coupang-watercolor.webp" alt="" />
      </div>

      <div className="report">
        <CompareTable />
        <QuoteWall />
      </div>

      <footer className="site-footer">
        <div>
          <p className="footer-title">Coupang x SpaceXAI</p>
          <p>Persistent agents for the work between reviews.</p>
        </div>
        <address className="footer-contact">
          <p>Your Cursor contact</p>
          <strong>Mike Weinert</strong>
          <a href="mailto:mike.weinert@cursor.com">
            mike.weinert@cursor.com
          </a>
        </address>
      </footer>
    </main>
  );
}
