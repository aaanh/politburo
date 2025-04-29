import { PositionService } from "@/services/position-service";

interface Position {
  id: number;
  title: string;
  order: number;
  children: Position[];
  assignedPeople?: { id: number; name: string }[];
}

const positionService = PositionService.getInstance();

export async function getAllPositions() {
  try {
    const positions = await positionService.getAllPositionsWithPeople();
    return { success: true, data: positions };
  } catch (error) {
    console.error("Error fetching positions:", error);
    return { success: false, error: "Failed to fetch positions" };
  }
}
