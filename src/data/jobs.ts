import type { Artifact, CroJob, SlideCard } from "./types";

export const LAUNCH_BRIEF_SLIDES: SlideCard[] = [
  {
    n: 1,
    kicker: "Working brief",
    title: "Service promise",
    body: "Keep the delivery promise and the systems needed to support it in one view.",
  },
  {
    n: 2,
    kicker: "Working brief",
    title: "Local operations",
    body: "Put local process checks beside the launch plan so owners can review them together.",
  },
  {
    n: 3,
    kicker: "Working brief",
    title: "Trust checks",
    body: "Keep data controls and unresolved questions visible before the next decision.",
  },
  {
    n: 4,
    kicker: "Working brief",
    title: "Next review",
    body: "Confirm the open owners in the room. The agent keeps the brief current after that.",
  },
];

export const SOURCE_ANSWER: Extract<Artifact, { kind: "redlines" }> = {
  kind: "redlines",
  title: "Source check response",
  paperTitle: "Open questions",
  from: "Illustrative internal request",
  marks: [
    {
      text: "Which source owns this control?",
      note: "The draft links the system of record and names the team that can verify it.",
      take: true,
    },
    {
      text: "What changed since the last review?",
      note: "The draft separates confirmed changes from items that still need an owner.",
      take: true,
    },
    {
      text: "Can the team close the check?",
      note: "Keep it open until the named reviewer confirms the source.",
      take: false,
    },
  ],
  reply: {
    to: "Launch working group",
    subject: "Open control check with sources and owner",
    body: "I checked the linked source systems and prepared a short answer. Confirmed items are marked ready. One check still needs the named reviewer, so it stays open. Nothing has been posted.",
  },
};

export const REVIEW_PACKET: Extract<Artifact, { kind: "one-pager" }> = {
  kind: "one-pager",
  title: "Program review packet",
  eyebrow: "Illustrative output",
  sections: [
    {
      heading: "Plan",
      body: "The current plan and its source links sit at the top of the packet.",
    },
    {
      heading: "Checks",
      body: "Each open check has a status, source, and reviewer.",
    },
    {
      heading: "Open owners",
      body: "Items without an owner stay visible for the next review.",
    },
    {
      heading: "Approval",
      body: "The team decides what to share. The agent keeps every output in draft.",
    },
  ],
};

export const JOBS: CroJob[] = [
  {
    id: "launch-brief",
    number: 1,
    title: "Turn launch reviews into a working brief",
    trigger: "A cross-team review starts",
    backgroundAction: "Capturing decisions + updating the open brief",
    problem:
      "A review should not end with notes spread across chat, docs, and trackers.",
    botJob:
      "The review agent follows the meeting, checks the linked sources, and updates the brief while the team is still together.",
    storyboard: [
      {
        when: "Review starts",
        label: "The agent joins the review and opens the working plan.",
        scene: "call",
        visual: {
          kind: "live-call",
          title: "Taiwan launch review",
          people: [
            { initials: "YO", name: "You" },
            { initials: "OP", name: "Operations" },
            { initials: "TR", name: "Trust" },
          ],
        },
      },
      {
        when: "Sources open",
        label: "It checks the plan, tracker, and review notes together.",
        scene: "inspect",
        visual: {
          kind: "account-research",
          account: "Launch plan",
          sources: ["Plan", "Tracker", "Review notes"],
          signal: "Open checks found",
        },
      },
      {
        when: "Brief updated",
        label: "The working brief changes as owners and open checks become clear.",
        scene: "notes",
        visual: {
          kind: "deck-update",
          eyebrow: "Working brief",
          headline: "Launch checks and owners",
          product: "Taiwan operations",
          status: "Draft updated",
        },
      },
      {
        when: "Before the review ends",
        label: "The team gets one artifact to review.",
        scene: "deck",
        slides: LAUNCH_BRIEF_SLIDES,
      },
    ],
    unlock:
      "One live review becomes a brief with sources, open checks, and owners.",
    outcome:
      "The review ends with a working brief that the next team can use.",
    clips: [],
    demo: {
      title: "Review agent",
      subtitle: "Live review to a working brief",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "review",
          name: "Review agent",
          role: "bot",
          persona: "Keeps the launch brief current while the review is live",
          color: "#E43E30",
        },
        {
          id: "brief",
          name: "Brief agent",
          role: "bot",
          persona: "Turns checked sources into one artifact",
          color: "#2685BB",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "review",
          kind: "routine",
          body: "The launch review started. I opened the plan, tracker, and review notes. I will keep all output in draft.",
        },
        {
          id: "m2",
          from: "review",
          kind: "text",
          body: "I found the open checks and the teams attached to them. I am separating confirmed updates from items that still need an owner.",
        },
        {
          id: "m3",
          from: "brief",
          kind: "text",
          body: "The working brief is ready. It links each section back to the source material.",
        },
        {
          id: "m4",
          from: "brief",
          kind: "draft",
          draftLabel: "Launch brief",
          artifact: {
            kind: "slides",
            title: "Launch checks and owners",
            cards: LAUNCH_BRIEF_SLIDES,
          },
        },
        {
          id: "m5",
          from: "review",
          kind: "draft",
          draftLabel: "Follow-up note",
          artifact: {
            kind: "one-pager",
            title: "Next review note",
            eyebrow: "Illustrative output",
            sections: [
              {
                heading: "Ready",
                body: "Confirmed updates are linked to their source.",
              },
              {
                heading: "Open",
                body: "Unresolved checks stay visible with the next reviewer.",
              },
              {
                heading: "Next",
                body: "The team can set the next review after owners are confirmed.",
              },
            ],
          },
        },
        {
          id: "m6",
          from: "review",
          kind: "system",
          body: "Nothing sent. The brief and follow-up note stay in draft.",
        },
      ],
    },
  },
  {
    id: "answer-desk",
    number: 2,
    title: "Answer internal questions before work stalls",
    trigger: "A team question lands",
    backgroundAction: "Checking source systems + drafting a cited answer",
    problem:
      "A simple question can turn into a long search across docs, chat, and internal systems.",
    botJob:
      "The source agent finds the system of record, checks what changed, and drafts an answer with the open owner still visible.",
    storyboard: [
      {
        when: "Question lands",
        label: "The source agent starts without waiting for a prompt.",
        scene: "notes",
        visual: {
          kind: "procurement-email",
          sender: "Launch team",
          subject: "Which controls are still open?",
          summary: "Source check requested",
        },
      },
      {
        when: "Sources checked",
        label: "It separates confirmed answers from items that need review.",
        scene: "inspect",
        visual: {
          kind: "answers-found",
          sources: [
            { name: "Plan", answer: "Current version linked" },
            { name: "Tracker", answer: "Open items checked" },
            { name: "Owner list", answer: "Reviewer identified" },
          ],
          status: "Sources attached",
        },
      },
      {
        when: "Draft ready",
        label: "The answer is ready with its sources and open owner.",
        scene: "send",
        artifact: SOURCE_ANSWER,
        visual: {
          kind: "reply-ready",
          to: "Launch working group",
          subject: "Open control check",
          status: "Ready to review",
        },
      },
    ],
    unlock:
      "The team gets a source-backed answer without chasing each system by hand.",
    outcome:
      "A question lands. The answer comes back with sources and an owner.",
    clips: [],
    demo: {
      title: "Source agent",
      subtitle: "Internal question to a checked answer",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "source",
          name: "Source agent",
          role: "bot",
          persona: "Checks the systems behind an internal question",
          color: "#2685BB",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "source",
          kind: "routine",
          body: "A control question landed. I am checking the plan, tracker, and owner list before I draft an answer.",
        },
        {
          id: "m2",
          from: "source",
          kind: "text",
          body: "The sources agree on the current state. One check still needs the named reviewer, so I am leaving it open.",
        },
        {
          id: "m3",
          from: "source",
          kind: "draft",
          draftLabel: "Checked response",
          artifact: SOURCE_ANSWER,
        },
        {
          id: "m4",
          from: "source",
          kind: "draft",
          draftLabel: "Email reply",
          artifact: {
            kind: "gmail",
            title: "Reply to the working group",
            to: SOURCE_ANSWER.reply.to,
            subject: SOURCE_ANSWER.reply.subject,
            body: SOURCE_ANSWER.reply.body,
          },
        },
        {
          id: "m5",
          from: "source",
          kind: "system",
          body: "Nothing sent. The response stays in draft until you approve it.",
        },
      ],
    },
  },
  {
    id: "review-packet",
    number: 3,
    title: "Build the next review packet in the background",
    trigger: "A program enters weekly review",
    backgroundAction: "Collecting source material + preparing the packet",
    problem:
      "Review time is wasted when the plan, checks, and open owners live in separate places.",
    botJob:
      "The packet agent opens the source material, keeps uncertain items marked open, and prepares one packet for the team.",
    storyboard: [
      {
        when: "Program queued",
        label: "The agent opens the plan and linked source material.",
        scene: "inspect",
        visual: {
          kind: "account-research",
          account: "Program review",
          sources: ["Plan", "Tracker", "Docs"],
          signal: "Sources collected",
        },
      },
      {
        when: "Packet taking shape",
        label: "It groups the plan, checks, and missing owners.",
        scene: "notes",
        visual: {
          kind: "three-why",
          items: [
            { label: "Plan", answer: "Current source linked" },
            { label: "Checks", answer: "Open items visible" },
            { label: "Owners", answer: "Missing names flagged" },
          ],
        },
      },
      {
        when: "Drafts ready",
        label: "The packet and review note stay together.",
        scene: "map",
        visual: {
          kind: "outreach-ready",
          person: "Review group",
          channels: ["Brief", "Checklist", "Review note"],
          status: "Drafts ready",
        },
      },
      {
        when: "Ready for review",
        label: "The final frame is the artifact.",
        scene: "send",
        artifact: REVIEW_PACKET,
      },
    ],
    unlock:
      "The next review opens with one packet instead of a search across tabs.",
    outcome:
      "The team opens one packet with the plan, checks, and unanswered questions.",
    clips: [],
    demo: {
      title: "Packet agent",
      subtitle: "Source material to a review packet",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "packet",
          name: "Packet agent",
          role: "bot",
          persona: "Prepares the packet and keeps open items honest",
          color: "#78A848",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "packet",
          kind: "routine",
          body: "This program entered the review queue. I am opening the current plan, tracker, and linked docs.",
        },
        {
          id: "m2",
          from: "packet",
          kind: "text",
          body: "The packet is taking shape. I marked missing owners as open instead of filling them in.",
        },
        {
          id: "m3",
          from: "packet",
          kind: "draft",
          draftLabel: "Source map",
          artifact: {
            kind: "packet",
            title: "Review source map",
            fields: [
              { label: "Plan", value: "Current source linked" },
              { label: "Checks", value: "Open items listed" },
              { label: "Owners", value: "Missing names left open" },
            ],
          },
        },
        {
          id: "m4",
          from: "packet",
          kind: "draft",
          draftLabel: "Program review packet",
          artifact: REVIEW_PACKET,
        },
        {
          id: "m5",
          from: "packet",
          kind: "system",
          body: "Nothing shared. The packet stays in draft until your team reviews it.",
        },
      ],
    },
  },
];

export function getJob(id: string): CroJob | undefined {
  return JOBS.find((job) => job.id === id);
}
