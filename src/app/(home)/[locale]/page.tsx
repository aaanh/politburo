import { getAllPositions } from "./actions";
import HomeContainer from "./home-container";
import OrgChartClient from "./org-chart-client";
import I18nProvider from "@/contexts/i18n-context";

export default async function Home({ params }: { params: { locale: string } }) {
  const result = await getAllPositions();
  const positions = result.success ? result.data || [] : [];
  const resolvedLocale =
    typeof params?.locale === "string" ? params.locale : "en";

  return (
    <HomeContainer
      positions={positions}
      locale={resolvedLocale}
      i18nNamespaces={["default"]}
    />
  );
}
