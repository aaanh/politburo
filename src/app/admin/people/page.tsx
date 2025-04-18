import { getAllPeople, getAllPositions } from "../actions";
import { PeopleProvider } from "@/contexts/people-context";
import { PositionsProvider } from "@/contexts/positions-context";
import PeopleContainer from "../components/people-container";

export default async function PeoplePage({ params }: { params: Promise<{ locale: string }> }) {
  const [peopleResult, positionsResult] = await Promise.all([
    getAllPeople(),
    getAllPositions(),
  ]);

  const people = peopleResult.success && peopleResult.data ? peopleResult.data : [];
  const positions = positionsResult.success
    ? (positionsResult.data || []).map((pos, index) => ({ ...pos, order: index }))
    : [];

  const resolvedLocale =
    typeof (await params).locale === "string" ? (await params).locale : "en";

  return (
    <PositionsProvider initialPositions={positions}>
      <PeopleProvider initialPeople={people}>
        <PeopleContainer locale={resolvedLocale} i18nNamespaces={["default"]} />
      </PeopleProvider>
    </PositionsProvider>
  );
}
