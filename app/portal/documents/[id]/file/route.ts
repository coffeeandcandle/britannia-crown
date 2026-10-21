import { getViewer, documentFile } from "../../../../lib/portal/dal";

// Downloads a document. The file is only sent to the family it belongs to, or to a consultant or admin.
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const viewer = await getViewer();
  if (!viewer) return new Response("Not found", { status: 404 });
  const id = Number((await params).id);
  const doc = Number.isInteger(id) ? await documentFile(id) : null;
  const isManager = viewer.staff && (viewer.staff.role === "admin" || viewer.staff.role === "consultant");
  const isOwner = viewer.family && doc && viewer.family.id === doc.family_id;
  if (!doc || !(isManager || isOwner)) return new Response("Not found", { status: 404 });
  const wantSigned = new URL(req.url).searchParams.get("v") === "signed" && doc.signed_data;
  const safeName = (wantSigned ? `signed-${doc.filename.replace(/\.[^.]+$/, "")}.pdf` : doc.filename).replace(/["\r\n]/g, "");
  return new Response(new Uint8Array(wantSigned ? doc.signed_data! : doc.data), {
    headers: {
      "Content-Type": wantSigned ? "application/pdf" : doc.mime,
      "Content-Disposition": `inline; filename="${safeName}"`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store",
    },
  });
}
