import type { ClipId, JobId } from "./types";

export type SiteKind =
  | "granola"
  | "figma"
  | "gmail"
  | "gdoc"
  | "research"
  | "page"
  | "clip";

export type ChromeTab = {
  id: string;
  host: string;
  label: string;
};

export type ComputerBeat = {
  pill: string;
  host: string;
  path?: string;
  title: string;
  site: SiteKind;
  clip?: ClipId;
  tabs: ChromeTab[];
};

const granola = { id: "granola", host: "granola.app", label: "Review notes" };
const figma = { id: "figma", host: "figma.com", label: "Working brief" };
const gmail = { id: "gmail", host: "mail.google.com", label: "Gmail" };
const docs = { id: "docs", host: "docs.google.com", label: "Docs" };
const workspace = {
  id: "workspace",
  host: "workspace.example",
  label: "Sources",
};

export const SCREENS: Record<JobId, Record<string, ComputerBeat>> = {
  "launch-brief": {
    m1: {
      pill: "Opening the review notes",
      host: "granola.app",
      path: "/notes/launch-review",
      title: "Launch review",
      site: "granola",
      tabs: [granola, workspace, figma],
    },
    m2: {
      pill: "Checking the linked sources",
      host: "workspace.example",
      path: "/launch/sources",
      title: "Launch sources",
      site: "research",
      tabs: [granola, workspace, figma],
    },
    m3: {
      pill: "Updating the working brief",
      host: "figma.com",
      path: "/file/launch-brief",
      title: "Launch brief",
      site: "figma",
      tabs: [granola, workspace, figma],
    },
    m4: {
      pill: "Preparing the launch brief",
      host: "figma.com",
      path: "/file/launch-brief",
      title: "Launch brief",
      site: "figma",
      tabs: [granola, workspace, figma],
    },
    m5: {
      pill: "Drafting the review note",
      host: "docs.google.com",
      path: "/document/d/next-review",
      title: "Next review note",
      site: "gdoc",
      tabs: [granola, figma, docs],
    },
    m6: {
      pill: "Drafts parked for review",
      host: "docs.google.com",
      path: "/document/d/next-review",
      title: "Next review note",
      site: "gdoc",
      tabs: [granola, figma, docs],
    },
  },
  "answer-desk": {
    m1: {
      pill: "Opening the source systems",
      host: "workspace.example",
      path: "/controls/open",
      title: "Open control checks",
      site: "research",
      tabs: [workspace, docs, gmail],
    },
    m2: {
      pill: "Checking the current sources",
      host: "workspace.example",
      path: "/controls/open",
      title: "Open control checks",
      site: "research",
      tabs: [workspace, docs, gmail],
    },
    m3: {
      pill: "Writing the checked response",
      host: "docs.google.com",
      path: "/document/d/source-check",
      title: "Source check response",
      site: "gdoc",
      tabs: [workspace, docs, gmail],
    },
    m4: {
      pill: "Drafting the reply",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [workspace, docs, gmail],
    },
    m5: {
      pill: "Reply parked for approval",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [workspace, docs, gmail],
    },
  },
  "review-packet": {
    m1: {
      pill: "Collecting source material",
      host: "workspace.example",
      path: "/program/source-map",
      title: "Program source map",
      site: "research",
      tabs: [workspace, docs, figma],
    },
    m2: {
      pill: "Marking missing owners",
      host: "workspace.example",
      path: "/program/source-map",
      title: "Program source map",
      site: "research",
      tabs: [workspace, docs, figma],
    },
    m3: {
      pill: "Building the source map",
      host: "docs.google.com",
      path: "/document/d/review-source-map",
      title: "Review source map",
      site: "gdoc",
      tabs: [workspace, docs, figma],
    },
    m4: {
      pill: "Preparing the review packet",
      host: "figma.com",
      path: "/file/review-packet",
      title: "Program review packet",
      site: "figma",
      tabs: [workspace, docs, figma],
    },
    m5: {
      pill: "Packet parked for review",
      host: "figma.com",
      path: "/file/review-packet",
      title: "Program review packet",
      site: "figma",
      tabs: [workspace, docs, figma],
    },
  },
};

export function beatFor(
  jobId: JobId,
  messageId: string | undefined,
): ComputerBeat | undefined {
  if (!messageId) return undefined;
  return SCREENS[jobId]?.[messageId];
}
