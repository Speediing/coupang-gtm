export type HeroJobIcon =
  | "brief"
  | "source"
  | "follow-up"
  | "check"
  | "change"
  | "review"
  | "incident"
  | "operating-review";

export type HeroJob = Readonly<{
  name: string;
  icon: HeroJobIcon;
  workspace: string;
  signal: string;
  work: string;
  result: string;
  user: string;
  bot: string;
}>;

type HeroJobSet = readonly [
  HeroJob,
  HeroJob,
  HeroJob,
  HeroJob,
  HeroJob,
  HeroJob,
  HeroJob,
  HeroJob,
];

export const HERO_JOBS = [
  {
    name: "Launch Brief",
    icon: "brief",
    workspace: "Taiwan launch review",
    signal: "Cross-team review started",
    work: "I opened the plan, tracker, and review notes. Confirmed changes link back to their sources. Checks without owners stay open.",
    result: "Working brief ready for review",
    user: "show me the open owners",
    bot: "done. the brief stays in draft.",
  },
  {
    name: "Source Answer",
    icon: "source",
    workspace: "Launch working group",
    signal: "A control question landed",
    work: "I checked the plan, tracker, and owner list. The sources agree on the current state. One check still needs review.",
    result: "Cited answer ready",
    user: "keep the unconfirmed check open",
    bot: "kept open. nothing has been sent.",
  },
  {
    name: "Review Packet",
    icon: "review",
    workspace: "Program review",
    signal: "The review window opened",
    work: "I collected the current plan, linked checks, and review notes. Missing owners remain marked for the team.",
    result: "Review packet ready",
    user: "share the draft with me",
    bot: "sent to you. no one else has it.",
  },
  {
    name: "Owner Follow-up",
    icon: "follow-up",
    workspace: "Open checks",
    signal: "An item has no owner",
    work: "I traced the related notes and source links. I prepared a short follow-up for the team to confirm the owner.",
    result: "Owner follow-up ready",
    user: "hold it until the review",
    bot: "held. i will keep it visible.",
  },
  {
    name: "Change Watch",
    icon: "change",
    workspace: "Launch plan",
    signal: "A linked source changed",
    work: "I compared the new source with the working brief. Confirmed changes and related open checks are separated.",
    result: "Change summary ready",
    user: "add it to the working brief",
    bot: "added as a draft update.",
  },
  {
    name: "Trust Check",
    icon: "check",
    workspace: "Trust review",
    signal: "A control needs confirmation",
    work: "I found the system of record and the named reviewer. The draft shows what is confirmed and what still needs a decision.",
    result: "Trust check ready",
    user: "leave the decision with the reviewer",
    bot: "left open. the source is attached.",
  },
  {
    name: "Incident Brief",
    icon: "incident",
    workspace: "Operating review",
    signal: "An incident review started",
    work: "I gathered the linked timeline, notes, and action tracker. Open actions stay separate from confirmed facts.",
    result: "Incident brief ready",
    user: "keep this internal for now",
    bot: "kept internal. the draft is ready.",
  },
  {
    name: "Operating Review",
    icon: "operating-review",
    workspace: "Weekly review",
    signal: "The review queue opened",
    work: "I brought the current plan, open checks, and missing owners into one view. Nothing uncertain was filled in.",
    result: "Operating brief ready",
    user: "bring me the decisions first",
    bot: "ready. the open decisions are at the top.",
  },
] satisfies HeroJobSet;
