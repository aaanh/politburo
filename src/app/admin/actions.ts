"use server";

import { PositionService } from "@/services/position-service";
import { PeopleService } from "@/services/people-service";
import { revalidatePath } from "next/cache";

const positionService = PositionService.getInstance();
const peopleService = PeopleService.getInstance();

export async function createPosition(title: string, parentId?: number) {
  try {
    const result = await positionService.create(title, parentId);
    revalidatePath("/admin/positions");
    revalidatePath("/admin/people");
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
    const result = await positionService.getAllPositionsWithPeople();
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: "Failed to get positions" };
  }
}

export async function updatePosition(id: number, title: string) {
  try {
    const result = await positionService.update(id, title);
    revalidatePath("/admin/positions");
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: "Failed to update position" };
  }
}

export async function deletePosition(id: number) {
  try {
    const result = await positionService.delete(id);
    revalidatePath("/admin/positions");
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
      data: { children, parents, ancestors, descendants },
    };
  } catch (error) {
    return { success: false, error: "Failed to get position hierarchy" };
  }
}

export async function addChildPosition(parentId: number, childId: number) {
  try {
    await positionService.addChild(parentId, childId);
    revalidatePath("/admin/positions");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to add child position" };
  }
}

export async function createPerson(name: string) {
  try {
    const result = await peopleService.create(name);
    revalidatePath("/admin/people");
    revalidatePath("/admin/positions");
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: "Failed to create person" };
  }
}

export async function getPerson(id: number) {
  try {
    const result = await peopleService.read(id);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: "Failed to get person" };
  }
}

export async function getAllPeople() {
  try {
    const result = await peopleService.readAll();
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: "Failed to get people" };
  }
}

export async function updatePerson(id: number, name: string) {
  try {
    const result = await peopleService.update(id, name);
    revalidatePath("/admin/people");
    revalidatePath("/admin/positions");
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: "Failed to update person" };
  }
}

export async function deletePerson(id: number) {
  try {
    const result = await peopleService.delete(id);
    revalidatePath("/admin/people");
    revalidatePath("/admin/positions");
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: "Failed to delete person" };
  }
}

export async function assignPerson(positionId: number, personId: number) {
  try {
    const result = await positionService.assignPerson(positionId, personId);
    revalidatePath("/admin/people");
    revalidatePath("/admin/positions");
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: "Failed to assign person" };
  }
}

export async function unassignPerson(positionId: number, personId: number) {
  try {
    const result = await positionService.unassignPerson(positionId, personId);
    revalidatePath("/admin/people");
    revalidatePath("/admin/positions");
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: "Failed to unassign person" };
  }
}
