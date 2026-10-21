import { requireFamily, familyDocuments } from "../../../lib/portal/dal";
import { formatDate } from "../../../lib/portal/time";
import { PageHeader, Card, EmptyState } from "../../ui";

const size = (n: number) => (n < 1024 * 1024 ? `${Math.max(1, Math.round(n / 1024))} KB` : `${(n / 1024 / 1024).toFixed(1)} MB`);

export default async function FamilyDocumentsPage() {
  const { family } = await requireFamily();
  const docs = await familyDocuments(family.id);
  return (
    <>
      <PageHeader title="Documents" description="Reports, plans and letters from your consultant, kept here for you. Only your family can see them." />
      <Card>
        {docs.length === 0 ? (
          <EmptyState title="No documents yet">When your consultant shares something with you, it appears here.</EmptyState>
        ) : (
          <ul className="ui-rows">
            {docs.map((d) => (
              <li key={d.id}>
                <a href={`/portal/documents/${d.id}/file`} className="ui-row-link" download>
                  <span className="ui-row-main">
                    <strong>{d.title}</strong>
                    <span>{d.note ?? d.filename}</span>
                  </span>
                  <span className="ui-row-cell ui-hide-sm">
                    <span className="ui-row-label">Added</span>
                    {formatDate(new Date(d.created_at), family.timezone)}
                  </span>
                  <span className="ui-row-cell">
                    <span className="ui-row-label">Size</span>
                    {size(d.size)}
                  </span>
                  <span className="btn-secondary ui-btn-sm">Download</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}
