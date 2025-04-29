import { db } from "../db/drizzle";
import { governmentPositions, governmentPositionHierarchy, positionAssignments, people } from "../db/schema";
import { eq, and, or, sql } from "drizzle-orm";

export class PositionService {
  #db: typeof db;
  private static instance: PositionService;

  private constructor() {
    this.#db = db;
  }

  public static getInstance(): PositionService {
    if (!PositionService.instance) {
      PositionService.instance = new PositionService();
    }
    return PositionService.instance;
  }

  async create(title: string, parentId?: number) {
    const [position] = await this.#db.insert(governmentPositions).values({ title }).returning();
    
    // Add self-reference
    await this.#db.insert(governmentPositionHierarchy).values({
      ancestorId: position.id,
      descendantId: position.id,
      depth: 0
    });

    // If parent is provided, add parent-child relationships
    if (parentId) {
      await this.addChild(parentId, position.id);
    }

    return position;
  }

  async read(id: number) {
    const result = await this.#db
      .select()
      .from(governmentPositions)
      .where(eq(governmentPositions.id, id));
    return result[0];
  }

  async readAll() {
    return await this.#db.select().from(governmentPositions);
  }

  async update(id: number, title: string, newParentId?: number) {
    // First update the title
    const [position] = await this.#db
      .update(governmentPositions)
      .set({ title })
      .where(eq(governmentPositions.id, id))
      .returning();

    // If a new parent is provided, update the hierarchy
    if (newParentId !== undefined) {
      await this.updateParent(id, newParentId);
    }

    return position;
  }

  async updateParent(positionId: number, newParentId: number | null) {
    // First remove all existing hierarchy entries for this position
    // except the self-reference
    await this.#db
      .delete(governmentPositionHierarchy)
      .where(
        and(
          eq(governmentPositionHierarchy.descendantId, positionId),
          sql`${governmentPositionHierarchy.depth} > 0`
        )
      );

    // If newParentId is null, we're making this a root position
    if (newParentId === null) {
      return;
    }

    // Get all ancestors of the new parent
    const parentAncestors = await this.#db
      .select()
      .from(governmentPositionHierarchy)
      .where(eq(governmentPositionHierarchy.descendantId, newParentId));

    // Insert new relationships
    const newRelationships = parentAncestors.map(ancestor => ({
      ancestorId: ancestor.ancestorId,
      descendantId: positionId,
      depth: ancestor.depth + 1
    }));

    // Add direct parent-child relationship
    newRelationships.push({
      ancestorId: newParentId,
      descendantId: positionId,
      depth: 1
    });

    await this.#db.insert(governmentPositionHierarchy).values(newRelationships);
  }

  async delete(id: number) {
    // Get the parent of the position being deleted
    const parents = await this.getParents(id);
    const parentId = parents[0]?.government_positions.id ?? null;

    // Get all direct children of the position being deleted
    const children = await this.getChildren(id);

    // Move all children to the parent of the deleted position
    for (const child of children) {
      await this.updateParent(child.government_positions.id, parentId);
    }

    // Delete all hierarchy entries for this position
    await this.#db
      .delete(governmentPositionHierarchy)
      .where(
        or(
          eq(governmentPositionHierarchy.ancestorId, id),
          eq(governmentPositionHierarchy.descendantId, id)
        )
      );

    // Delete the position itself
    return await this.#db
      .delete(governmentPositions)
      .where(eq(governmentPositions.id, id))
      .returning();
  }

  async addChild(parentId: number, childId: number) {
    // Get all ancestors of the parent
    const parentAncestors = await this.#db
      .select()
      .from(governmentPositionHierarchy)
      .where(eq(governmentPositionHierarchy.descendantId, parentId));

    // Insert new relationships
    const newRelationships = parentAncestors.map(ancestor => ({
      ancestorId: ancestor.ancestorId,
      descendantId: childId,
      depth: ancestor.depth + 1
    }));

    await this.#db.insert(governmentPositionHierarchy).values(newRelationships);
  }

  async getChildren(id: number) {
    return await this.#db
      .select()
      .from(governmentPositions)
      .innerJoin(
        governmentPositionHierarchy,
        eq(governmentPositions.id, governmentPositionHierarchy.descendantId)
      )
      .where(
        and(
          eq(governmentPositionHierarchy.ancestorId, id),
          eq(governmentPositionHierarchy.depth, 1)
        )
      );
  }

  async getParents(id: number) {
    return await this.#db
      .select()
      .from(governmentPositions)
      .innerJoin(
        governmentPositionHierarchy,
        eq(governmentPositions.id, governmentPositionHierarchy.ancestorId)
      )
      .where(
        and(
          eq(governmentPositionHierarchy.descendantId, id),
          eq(governmentPositionHierarchy.depth, 1)
        )
      );
  }

  async getAncestors(id: number) {
    return await this.#db
      .select()
      .from(governmentPositions)
      .innerJoin(
        governmentPositionHierarchy,
        eq(governmentPositions.id, governmentPositionHierarchy.ancestorId)
      )
      .where(
        and(
          eq(governmentPositionHierarchy.descendantId, id),
          sql`${governmentPositionHierarchy.depth} > 0`
        )
      );
  }

  async getDescendants(id: number) {
    return await this.#db
      .select()
      .from(governmentPositions)
      .innerJoin(
        governmentPositionHierarchy,
        eq(governmentPositions.id, governmentPositionHierarchy.descendantId)
      )
      .where(
        and(
          eq(governmentPositionHierarchy.ancestorId, id),
          sql`${governmentPositionHierarchy.depth} > 0`
        )
      );
  }

  async assignPerson(positionId: number, personId: number) {
    const [assignment] = await this.#db
      .insert(positionAssignments)
      .values({
        positionId,
        personId,
        startDate: new Date(),
      })
      .returning();
    return assignment;
  }

  async unassignPerson(positionId: number, personId: number) {
    const [assignment] = await this.#db
      .update(positionAssignments)
      .set({
        endDate: new Date(),
      })
      .where(
        and(
          eq(positionAssignments.positionId, positionId),
          eq(positionAssignments.personId, personId),
          sql`${positionAssignments.endDate} IS NULL`
        )
      )
      .returning();
    return assignment;
  }

  async getPositionWithPeople(id: number) {
    const position = await this.read(id);
    if (!position) return null;

    const assignments = await this.#db
      .select({
        id: people.id,
        name: people.name,
      })
      .from(positionAssignments)
      .innerJoin(people, eq(positionAssignments.personId, people.id))
      .where(
        and(
          eq(positionAssignments.positionId, id),
          sql`${positionAssignments.endDate} IS NULL`
        )
      );

    return {
      ...position,
      assignedPeople: assignments,
    };
  }

  async getAllPositionsWithPeople() {
    const positions = await this.readAll();
    const hierarchies = await this.#db
      .select()
      .from(governmentPositionHierarchy)
      .where(eq(governmentPositionHierarchy.depth, 1));

    const assignments = await this.#db
      .select({
        positionId: positionAssignments.positionId,
        personId: people.id,
        name: people.name,
      })
      .from(positionAssignments)
      .innerJoin(people, eq(positionAssignments.personId, people.id))
      .where(sql`${positionAssignments.endDate} IS NULL`);

    // Transform flat positions into a tree structure
    const positionMap = new Map<number, any>(
      positions.map(pos => [pos.id, { 
        ...pos, 
        order: pos.id, 
        children: [],
        assignedPeople: assignments
          .filter(a => a.positionId === pos.id)
          .map(a => ({ id: a.personId, name: a.name }))
      }])
    );
    
    hierarchies.forEach(hierarchy => {
      const parent = positionMap.get(hierarchy.ancestorId!);
      const child = positionMap.get(hierarchy.descendantId!);
      if (parent && child) {
        parent.children.push(child);
      }
    });

    // Get root positions (those without parents)
    return positions
      .filter(pos => !hierarchies.some(h => h.descendantId === pos.id))
      .map(pos => positionMap.get(pos.id)!);
  }
}
