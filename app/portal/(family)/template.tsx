import PageTransition from "../../components/PageTransition";

export default function FamilyTemplate({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
