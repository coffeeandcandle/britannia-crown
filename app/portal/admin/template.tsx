import PageTransition from "../../components/PageTransition";

export default function StaffTemplate({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
