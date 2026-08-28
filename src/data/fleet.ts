import type { JobId } from "./types";

export type FleetBot = {
  id: string;
  name: string;
  blurb: string;
  color: string;
  jobId?: JobId;
  mark?: string;
  seat?: boolean;
};

export const FLEET: FleetBot[] = [
  {
    id: "team",
    name: "Coupang team",
    blurb: "People set direction and approve the work.",
    color: "#E6DDD0",
    mark: "You",
    seat: true,
  },
  {
    id: "review",
    name: "Review agent",
    blurb: "Follows a live review and updates the working brief.",
    jobId: "launch-brief",
    color: "#E43E30",
  },
  {
    id: "source",
    name: "Source agent",
    blurb: "Checks the systems behind an internal question.",
    jobId: "answer-desk",
    color: "#2685BB",
  },
  {
    id: "packet",
    name: "Packet agent",
    blurb: "Collects the plan, checks, and open owners before a review.",
    jobId: "review-packet",
    color: "#78A848",
  },
  {
    id: "control",
    name: "Control agent",
    blurb: "Keeps unanswered checks visible until the team closes them.",
    color: "#F4A62A",
  },
];
