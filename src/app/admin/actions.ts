"use server";

import { PositionService } from "@/services/position-service";
import { revalidatePath } from "next/cache";

const positionService = PositionService.getInstance();

export async function createPosition(title: string, parentId?: number) {
  try {
    const result = await positionService.create(title, parentId);
    revalidatePath("/admin");
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: "Failed to create position" };
  }
}

export async function getPosition(id: number) {
  try {
    const result = await positionService.read(id);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: "Failed to get position" };
  }
}

export async function getAllPositions() {
  try {
    const result = await positionService.readAll();
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: "Failed to get positions" };
  }
}

export async function updatePosition(id: number, title: string) {
  try {
    const result = await positionService.update(id, title);
    revalidatePath("/admin");
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: "Failed to update position" };
  }
}

export async function deletePosition(id: number) {
  try {
    const result = await positionService.delete(id);
    revalidatePath("/admin");
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: "Failed to delete position" };
  }
}

export async function getPositionHierarchy(id: number) {
  try {
    const [children, parents, ancestors, descendants] = await Promise.all([
      positionService.getChildren(id),
      positionService.getParents(id),
      positionService.getAncestors(id),
      positionService.getDescendants(id),
    ]);
    return { 
      success: true, 
      data: { children, parents, ancestors, descendants } 
    };
  } catch (error) {
    return { success: false, error: "Failed to get position hierarchy" };
  }
}

export async function addChildPosition(parentId: number, childId: number) {
  try {
    await positionService.addChild(parentId, childId);
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to add child position" };
  }
}
