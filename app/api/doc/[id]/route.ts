import { documentFile } from "../../../lib/portal/dal";
import { verifyDocLink } from "../../../lib/portal/doclinks";

// The file for Microsoft's viewer. Only works with a valid, unexpired signed link made by the portal after it
// checked who is asking. Without one it behaves as if the file does not exist.
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id);
  const url = new URL(request.url);
  if (!Number.isInteger(id) || !verifyDocLink(id, url.searchParams.get("exp"), url.searchParams.get("sig"))) {
    return new Response("Not found", { status: 404 });
  }
  const doc = await documentFile(id);
  if (!doc) return new Response("Not found", { status: 404 });
  return new Response(new Uint8Array(doc.data), {
    headers: {
      "Content-Type": doc.mime,
      "Content-Disposition": `inline; filename="${doc.filename.replace(/["\r\n]/g, "")}"`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
