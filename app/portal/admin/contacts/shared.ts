import type { ContactRow } from "../../../lib/portal/dal";

export const stageTone: Record<ContactRow["stage"], "brand" | "warn" | "neutral" | "good" | "muted"> = {
  new: "warn",
  contacted: "neutral",
  consultation: "brand",
  client: "good",
  closed: "muted",
};

export const kindLabel = { family: "", ambassador: "Ambassador", other: "Other" } as const;
