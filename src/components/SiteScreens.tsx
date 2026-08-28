import type { Artifact, DemoMessage } from "@/data/types";
import type { ComputerBeat } from "@/data/screens";
import { CLIPS } from "@/data/clips";
import { ArtifactCard } from "./ArtifactCard";

function asGmail(artifact?: Artifact) {
  return artifact?.kind === "gmail" ? artifact : null;
}

function ReviewNotesScreen() {
  return (
    <div className="site site-granola">
      <header>
        <strong>Review notes</strong>
        <span>Live working document</span>
      </header>
      <p className="site-time">Illustrative launch review</p>
      <ul>
        <li>
          <span>Plan</span> Current plan opened for the team.
        </li>
        <li>
          <span>Checks</span> Open items kept beside their source.
        </li>
        <li>
          <span>Owners</span> Missing names stay open.
        </li>
        <li>
          <span>Next</span> Draft the brief for team review.
        </li>
      </ul>
    </div>
  );
}

function SourcesScreen({ account }: { account: string }) {
  return (
    <div className="site site-research">
      <header>
        <strong>{account} workspace</strong>
        <span>Illustrative sources</span>
      </header>
      <p className="site-time">Checking source material</p>
      <ul>
        <li>
          <span>Plan</span> Current version linked.
        </li>
        <li>
          <span>Tracker</span> Open items checked.
        </li>
        <li>
          <span>Review notes</span> Recent decisions attached.
        </li>
        <li>
          <span>Owner list</span> Missing reviewers left open.
        </li>
      </ul>
    </div>
  );
}

function ArtifactWorkspace({
  artifact,
  account,
  surface,
}: {
  artifact?: Artifact;
  account: string;
  surface: "figma" | "gdoc" | "page";
}) {
  const className =
    surface === "figma"
      ? "site site-figma"
      : surface === "page"
        ? "site site-page"
        : "site site-gdoc";

  return (
    <div className={className}>
      <header>
        <strong>{surface === "figma" ? "Working brief" : "Draft document"}</strong>
        <span>{account} · not shared</span>
      </header>
      <article>
        {artifact ? (
          <ArtifactCard artifact={artifact} />
        ) : (
          <>
            <p className="gdoc-status">Draft in progress</p>
            <p>The agent is checking the linked sources before it writes.</p>
          </>
        )}
      </article>
    </div>
  );
}

function GmailScreen({
  account,
  artifact,
  sent,
}: {
  account: string;
  artifact?: Artifact;
  sent: boolean;
}) {
  const mail = asGmail(artifact);

  return (
    <div className="site site-gmail">
      <header>
        <strong>Gmail</strong>
        <em>{sent ? "Sent" : "Draft · not sent"}</em>
      </header>
      <p>
        <span>To</span>
        {mail?.to || `${account} working group`}
      </p>
      <p>
        <span>Subject</span>
        {mail?.subject || "Checked response"}
      </p>
      <div>
        {mail?.body ||
          "The response stays here until the team reviews the sources."}
      </div>
    </div>
  );
}

export function SiteScreen({
  beat,
  message,
  account,
  sent,
}: {
  beat: ComputerBeat;
  message?: DemoMessage;
  account: string;
  sent: boolean;
}) {
  const artifact = message?.artifact;

  if (beat.site === "clip" && beat.clip) {
    const clip = CLIPS[beat.clip];
    return (
      <div className="site-clip">
        <video
          src={clip.file}
          controls
          playsInline
          controlsList="nodownload"
          aria-label={clip.title}
        />
      </div>
    );
  }

  switch (beat.site) {
    case "granola":
      return <ReviewNotesScreen />;
    case "research":
      return <SourcesScreen account={account} />;
    case "gmail":
      return (
        <GmailScreen account={account} artifact={artifact} sent={sent} />
      );
    case "figma":
      return (
        <ArtifactWorkspace
          artifact={artifact}
          account={account}
          surface="figma"
        />
      );
    case "page":
      return (
        <ArtifactWorkspace
          artifact={artifact}
          account={account}
          surface="page"
        />
      );
    case "gdoc":
    default:
      return (
        <ArtifactWorkspace
          artifact={artifact}
          account={account}
          surface="gdoc"
        />
      );
  }
}
