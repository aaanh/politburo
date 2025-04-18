import { getAllPeople, getAllPositions } from "../actions";
import { PeopleProvider } from "@/contexts/people-context";
import { PositionsProvider } from "@/contexts/positions-context";
import I18nProvider from "@/contexts/i18n-context";
import People from "../components/people";

export default async function PeoplePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [peopleResult, positionsResult] = await Promise.all([
    getAllPeople(),
    getAllPositions(),
  ]);

  const people =
    peopleResult.success && peopleResult.data ? peopleResult.data : [];
  const positions = positionsResult.success
    ? (positionsResult.data || []).map((pos, index) => ({
        ...pos,
        order: index,
      }))
    : [];

  const resolvedLocale =
    typeof (await params).locale === "string" ? (await params).locale : "en";

  return (
    <PositionsProvider initialPositions={positions}>
      <PeopleProvider initialPeople={people}>
        <I18nProvider locale={resolvedLocale} namespaces={["default"]}>
          <People />
        </I18nProvider>
      </PeopleProvider>
    </PositionsProvider>
  );
}
