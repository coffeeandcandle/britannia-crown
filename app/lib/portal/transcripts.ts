import "server-only";
import { query, queryOne } from "./db";

// Call transcripts: Groq (free Whisper) transcribes each person's microphone, Gemini (free tier) turns it into a summary the team can use to
// draft documents. Everything here stays private to staff until a summary is released to the family.

export type TranscriptRow = {
  id: number;
  session_id: number;
  transcript: string;
  summary: string | null;
  summary_error: string | null;
  released_to_family: boolean;
  created_at: Date;
};

const MODEL = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
const MAX_CHARS = 300_000;

export const summaryEnabled = () => Boolean(process.env.GEMINI_API_KEY);

const PROMPT = `You are helping an education consultancy write up an online call between a consultant or tutor and a family.
Read the transcript and produce a detailed, accurate summary in plain British English with these headings:
Overview, Key points discussed, Decisions and agreements, Action items (who does what, by when if stated), Child's strengths and concerns raised, Questions left open, Suggested follow-up documents.
Only use what is in the transcript. If something is unclear or missing, say so rather than guessing. Do not invent names, dates or grades.`;

export async function summarise(transcript: string): Promise<string> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY is not set");
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
    method: "POST",
    headers: { "x-goog-api-key": key, "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: PROMPT }] },
      contents: [{ role: "user", parts: [{ text: `Transcript:\n\n${transcript}` }] }],
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Gemini failed (${res.status}): ${(await res.text()).slice(0, 200)}`);
  const data = (await res.json()) as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
  const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("").trim();
  if (!text) throw new Error("Gemini returned no summary");
  return text;
}

export async function summariseRow(id: number) {
  const row = await queryOne<{ transcript: string }>("SELECT transcript FROM session_transcripts WHERE id = $1", [id]);
  if (!row) return;
  try {
    const summary = await summarise(row.transcript);
    await query("UPDATE session_transcripts SET summary = $1, summary_error = NULL WHERE id = $2", [summary, id]);
  } catch (error) {
    console.error("Call summary failed", error);
    await query("UPDATE session_transcripts SET summary_error = $1 WHERE id = $2", [error instanceof Error ? error.message.slice(0, 300) : "Summary failed", id]);
  }
}

export const transcribeEnabled = () => Boolean(process.env.GROQ_API_KEY);

// Whisper makes up phrases like "Thank you." from silence or background noise, so we drop low-confidence pieces.
type Piece = { text: string; start: number; no_speech_prob?: number; avg_logprob?: number; compression_ratio?: number };
const keep = (p: Piece) => p.text.trim() && (p.no_speech_prob ?? 0) < 0.6 && (p.avg_logprob ?? 0) > -1 && (p.compression_ratio ?? 0) < 2.4;

// Sends one short recording to Groq's Whisper and returns what was said, with seconds from the start of the clip.
export async function transcribeClip(audio: Blob, filename: string): Promise<{ start: number; text: string }[]> {
  const key = process.env.GROQ_API_KEY;
  if (!key) throw new Error("GROQ_API_KEY is not set");
  const form = new FormData();
  form.set("file", audio, filename);
  form.set("model", process.env.GROQ_MODEL ?? "whisper-large-v3-turbo");
  form.set("response_format", "verbose_json");
  form.set("language", "en");
  form.set("temperature", "0");
  const res = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}` },
    body: form,
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Groq failed (${res.status}): ${(await res.text()).slice(0, 200)}`);
  const data = (await res.json()) as { segments?: Piece[] };
  return (data.segments ?? []).filter(keep).map((p) => ({ start: p.start, text: p.text.trim() }));
}

export async function addSegments(sessionId: number, speaker: string, clipStart: Date, pieces: { start: number; text: string }[]) {
  for (const p of pieces) {
    await query("INSERT INTO transcript_segments (session_id, speaker, said_at, body) VALUES ($1, $2, $3, $4)", [
      sessionId, speaker.slice(0, 60), new Date(clipStart.getTime() + p.start * 1000), p.text.slice(0, 2000),
    ]);
  }
}

export const segmentCount = async (sessionId: number) =>
  (await queryOne<{ n: number }>("SELECT count(*)::int AS n FROM transcript_segments WHERE session_id = $1", [sessionId]))?.n ?? 0;

// Merges everyone's pieces into one transcript ("Name: what they said"), then writes the summary.
export async function buildTranscript(sessionId: number) {
  const rows = await query<{ speaker: string; body: string }>("SELECT speaker, body FROM transcript_segments WHERE session_id = $1 ORDER BY said_at, id", [sessionId]);
  if (rows.length === 0) return false;
  const lines: string[] = [];
  let last = "";
  for (const r of rows) {
    if (r.speaker === last) lines[lines.length - 1] += ` ${r.body}`;
    else lines.push(`${r.speaker}: ${r.body}`);
    last = r.speaker;
  }
  const row = await queryOne<{ id: number }>(
    `INSERT INTO session_transcripts (session_id, transcript) VALUES ($1, $2)
     ON CONFLICT (session_id) DO UPDATE SET transcript = EXCLUDED.transcript RETURNING id`,
    [sessionId, lines.join("\n").slice(0, MAX_CHARS)],
  );
  if (row) await summariseRow(row.id);
  return true;
}

export const transcriptFor = (sessionId: number) =>
  queryOne<TranscriptRow>("SELECT id, session_id, transcript, summary, summary_error, released_to_family, created_at FROM session_transcripts WHERE session_id = $1", [sessionId]);

export const releasedSummary = (sessionId: number) =>
  queryOne<{ summary: string }>("SELECT summary FROM session_transcripts WHERE session_id = $1 AND released_to_family AND summary IS NOT NULL", [sessionId]);
