import { getAllPositions } from "../actions";
import { PositionsProvider } from "@/contexts/positions-context";
import I18nProvider from "@/contexts/i18n-context";
import Footer from "@/components/footer";
import PositionManagement from "../components/position";

export default async function PositionManagementPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const result = await getAllPositions();
  const positions = result.success
    ? (result.data || []).map((pos, index) => ({ ...pos, order: index }))
    : [];

  const resolvedLocale =
    typeof (await params).locale === "string" ? (await params).locale : "en";

  return (
    <PositionsProvider initialPositions={positions}>
      <I18nProvider locale={resolvedLocale} namespaces={["default"]}>
        <PositionManagement />

        <Footer />
      </I18nProvider>
    </PositionsProvider>
  );
}
