import { getAllPositions } from "./actions";
import OrgChartClient from "./org-chart-client";

export default async function Home() {
  const result = await getAllPositions();
  const positions = result.success ? result.data || [] : [];

  return <OrgChartClient initialPositions={positions} />;
}
