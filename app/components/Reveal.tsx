// Plain wrapper kept so existing pages don't need restructuring. Content renders immediately:
// no scroll-triggered fade-ins, which hid content from readers and slowed perceived load.
export default function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return <div className={className || undefined}>{children}</div>;
}
