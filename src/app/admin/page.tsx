import { getAllPositions } from "./actions";

import { PositionsProvider } from "@/contexts/positions-context";
import AdminContainer from "./components/admin-container";

export default async function AdminPage({
  params,
}: {
  params: { locale: string };
}) {
  const result = await getAllPositions();
  const positions = result.success
    ? (result.data || []).map((pos, index) => ({ ...pos, order: index }))
    : [];

  const resolvedLocale =
    typeof params?.locale === "string" ? params.locale : "en";

  return (
    <PositionsProvider initialPositions={positions}>
      <AdminContainer locale={resolvedLocale} i18nNamespaces={["default"]} />
    </PositionsProvider>
  );
}
