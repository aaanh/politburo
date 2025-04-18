import { getAllPositions } from "./actions";
import HomeWrapper from "./components/home-wrapper";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const result = await getAllPositions();
  const positions = result.success ? result.data || [] : [];
  const resolvedLocale =
    typeof (await params).locale === "string" ? (await params).locale : "en";

  return (
    <HomeWrapper
      positions={positions}
      locale={resolvedLocale}
      i18nNamespaces={["default"]}
    />
  );
}
