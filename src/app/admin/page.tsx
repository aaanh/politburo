import { getAllPositions } from "./actions";

import { PositionsProvider } from "@/contexts/positions-context";
import AdminContainer from "./components/admin-container";

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const result = await getAllPositions();
  const positions = result.success
    ? (result.data || []).map((pos, index) => ({ ...pos, order: index }))
    : [];

  const resolvedLocale =
    typeof (await params).locale === "string" ? (await params).locale : "en";

  return (
    <PositionsProvider initialPositions={positions}>
      <AdminContainer locale={resolvedLocale} i18nNamespaces={["default"]} />
    </PositionsProvider>
  );
}
