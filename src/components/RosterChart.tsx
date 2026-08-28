import { FLEET, type FleetBot } from "@/data/fleet";

function initials(bot: FleetBot) {
  if (bot.mark) return bot.mark;
  const parts = bot.name.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] || ""}${parts[parts.length - 1][0] || ""}`.toUpperCase();
}

function isLight(hex: string) {
  if (!hex.startsWith("#") || hex.length < 7) return false;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 180;
}

function ComputerIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <rect
        x="3.5"
        y="4.5"
        width="17"
        height="11.5"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M8.5 20h7M12 16v4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function Box({
  bot,
  chief = false,
}: {
  bot: FleetBot;
  chief?: boolean;
}) {
  const className = chief ? "org-box is-chief" : "org-box";
  const body = (
    <>
      <span
        className="org-avatar"
        style={{
          background: bot.color,
          color: isLight(bot.color) ? "#111" : "#fff",
        }}
        aria-hidden
      >
        {bot.seat ? initials(bot) : <ComputerIcon />}
      </span>
      <span className="org-name">{bot.name}</span>
      <span className="org-blurb">{bot.blurb}</span>
    </>
  );

  if (bot.jobId) {
    return (
      <a className={className} href={`#${bot.jobId}`}>
        {body}
      </a>
    );
  }

  return <div className={className}>{body}</div>;
}

export function RosterChart() {
  const seat = FLEET.find((item) => item.seat);
  const agents = FLEET.filter((item) => !item.seat);

  if (!seat) return null;

  return (
    <section id="roster" className="roster">
      <h2>A fleet of agents, each with its own computer.</h2>
      <p className="section-lede">
        The work is the trigger. A review starts, a question lands, or a
        program changes. The right agent picks it up and returns with work the
        team can inspect.
      </p>

      <div className="org" role="tree">
        <div className="org-top">
          <Box bot={seat} chief />
        </div>
        <div className="org-branch">
          <div className="org-connect" aria-hidden>
            <i className="org-stem" />
            <i className="org-bar" />
          </div>
          <ul className="org-kids">
            {agents.map((agent) => (
              <li key={agent.id} className="org-kid">
                <Box bot={agent} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
