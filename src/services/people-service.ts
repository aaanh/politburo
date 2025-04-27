import { db } from "../db/drizzle";
import { people } from "../db/schema";
import { eq } from "drizzle-orm";
import { positionAssignments } from "../db/schema";
import { CreatePeople } from "@/types";

export class PeopleService {
  #db: typeof db;
  private static instance: PeopleService;

  private constructor() {
    this.#db = db;
  }

  public static getInstance(): PeopleService {
    if (!PeopleService.instance) {
      PeopleService.instance = new PeopleService();
    }
    return PeopleService.instance;
  }

  async create(newPerson: CreatePeople) {
    const [person] = await this.#db
      .insert(people)
      .values(newPerson)
      .returning();
    return person;
  }

  async read(id: number) {
    const result = await this.#db
      .select()
      .from(people)
      .where(eq(people.id, id));
    return result[0];
  }

  async readAll() {
    const res = await this.#db.select().from(people).orderBy(people.name);

    return res;
  }

  async update(id: number, name: string) {
    const [person] = await this.#db
      .update(people)
      .set({ name })
      .where(eq(people.id, id))
      .returning();
    return person;
  }

  async delete(id: number) {
    // First delete all position assignments for this person
    await this.#db
      .delete(positionAssignments)
      .where(eq(positionAssignments.personId, id));

    // Then delete the person
    return await this.#db.delete(people).where(eq(people.id, id)).returning();
  }
}
