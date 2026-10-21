import { notFound } from "next/navigation";
import { requireFamily, documentFile, familyDocuments } from "../../../../lib/portal/dal";
import { formatDate } from "../../../../lib/portal/time";
import { siteOrigin } from "../../../../lib/portal/origin";
import { signDocLink, OFFICE_MIMES } from "../../../../lib/portal/doclinks";
import { PageHeader, Card } from "../../../ui";

// A document opens here, inside the portal, instead of downloading.
export default async function DocumentViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { family } = await requireFamily();
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();
  const meta = (await familyDocuments(family.id)).find((d) => d.id === id);
  if (!meta) notFound();
  const file = await documentFile(id);
  if (!file || file.family_id !== family.id) notFound();
  const src = `/portal/documents/${id}/file`;
  const office = OFFICE_MIMES.has(meta.mime) && meta.mime !== "text/csv" ? `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(signDocLink(id, await siteOrigin()))}` : null;

  return (
    <>
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
    </>
  );
}
