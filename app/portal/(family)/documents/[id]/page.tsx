import { notFound } from "next/navigation";
import { requireFamily, documentFile, familyDocuments } from "../../../../lib/portal/dal";
import { formatDate } from "../../../../lib/portal/time";
import { siteOrigin } from "../../../../lib/portal/origin";
import { signDocLink, OFFICE_MIMES } from "../../../../lib/portal/doclinks";
import { PageHeader, Card } from "../../../ui";
import { Flash } from "../../../components";
import { SubmitButton } from "../../../client-ui";
import SignaturePad from "../../../SignaturePad";
import { signDocument } from "../actions";
import { logActivity } from "../../../../lib/portal/audit";

// A document opens here, inside the portal, instead of downloading.
export default async function DocumentViewPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ ok?: string; error?: string }> }) {
  const { family } = await requireFamily();
  const id = Number((await params).id);
  const msg = await searchParams;
  if (!Number.isInteger(id)) notFound();
  const meta = (await familyDocuments(family.id)).find((d) => d.id === id);
  if (!meta) notFound();
  const file = await documentFile(id);
  if (!file || file.family_id !== family.id) notFound();
  await logActivity({ kind: "family", id: family.id, name: family.name }, "document.view", { familyId: family.id, detail: meta.title });
  const src = `/portal/documents/${id}/file`;
  const office = OFFICE_MIMES.has(meta.mime) && meta.mime !== "text/csv" ? `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(signDocLink(id, await siteOrigin()))}` : null;

  const signedCopy = meta.signed_at && file.signed_data;
  return (
    <>
      <Flash ok={msg.ok} error={msg.error} />
      <PageHeader
        back={{ href: "/portal/documents", label: "All documents" }}
        title={meta.title}
        description={`${meta.note ? `${meta.note}. ` : ""}Added ${formatDate(new Date(meta.created_at), family.timezone)}`}
        actions={<a href={office ? office.replace("/embed.aspx", "/view.aspx") : src} target="_blank" rel="noopener noreferrer" className="btn-secondary">Open full screen</a>}
      />
      <Card>
        {office ? (
          <iframe className="doc-frame" src={office} title={meta.title} />
        ) : meta.mime === "application/pdf" ? (
          <iframe className="doc-frame" src={`${src}#toolbar=0&navpanes=0`} title={meta.title} />
        ) : meta.mime.startsWith("image/") ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="doc-image" src={src} alt={meta.title} />
        ) : (
          <pre className="doc-text">{file.data.toString("utf8")}</pre>
        )}
      </Card>

      {signedCopy && (
        <Card title="Signed" description={`Signed by ${meta.signed_name} on ${formatDate(new Date(meta.signed_at!), family.timezone)}.`}>
          <iframe className="doc-frame" src={`/portal/documents/${id}/file?v=signed#toolbar=0&navpanes=0`} title={`${meta.title}, signed copy`} />
        </Card>
      )}
      {meta.needs_signature && !meta.signed_at && (
        <Card title="Sign this document" description="Read it above, then sign below. Your signature, the date and time and a fingerprint of the document are saved as a record.">
          <form action={signDocument} className="pt-form">
            <input type="hidden" name="id" value={id} />
            <SignaturePad defaultName={family.name} />
            <SubmitButton pendingText="Saving your signature…">Sign document</SubmitButton>
          </form>
        </Card>
      )}
    </>
  );
}
