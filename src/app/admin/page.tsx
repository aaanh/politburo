import { getAllPositions } from "../actions";
import AdminClient from "./admin-client";
import { PositionsProvider } from "./positions-context";

export default async function AdminPage() {
  const result = await getAllPositions();
  const positions = result.success
    ? (result.data || []).map((pos, index) => ({ ...pos, order: index }))
    : [];

  return (
    <PositionsProvider initialPositions={positions}>
      <AdminClient initialPositions={positions} />
    </PositionsProvider>
  );
}
