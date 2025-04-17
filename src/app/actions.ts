import { db } from "@/db/drizzle";
import { governmentPositions, governmentPositionHierarchy } from "@/db/schema";
import { eq } from "drizzle-orm";

interface Position {
  id: number;
  title: string;
  order: number;
  children: Position[];
}

export async function getAllPositions() {
  try {
    const positions = await db
      .select()
      .from(governmentPositions)
      .orderBy(governmentPositions.id);

    const hierarchies = await db
      .select()
      .from(governmentPositionHierarchy)
      .where(eq(governmentPositionHierarchy.depth, 1));

    // Transform flat positions into a tree structure
    const positionMap = new Map<number, Position>(
      positions.map(pos => [pos.id, { ...pos, order: pos.id, children: [] }])
    );
    
    hierarchies.forEach(hierarchy => {
      const parent = positionMap.get(hierarchy.ancestorId!);
      const child = positionMap.get(hierarchy.descendantId!);
      if (parent && child) {
        parent.children.push(child);
      }
    });

    // Get root positions (those without parents)
    const rootPositions = positions
      .filter(pos => !hierarchies.some(h => h.descendantId === pos.id))
      .map(pos => positionMap.get(pos.id)!);

    return { success: true, data: rootPositions };
  } catch (error) {
    console.error("Error fetching positions:", error);
    return { success: false, error: "Failed to fetch positions" };
  }
} 