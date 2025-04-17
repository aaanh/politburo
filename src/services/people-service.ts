import { db } from "../db/drizzle";
import { people } from "../db/schema";
import { eq } from "drizzle-orm";

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

  async create(name: string) {
    const [person] = await this.#db.insert(people).values({ name }).returning();
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
    return await this.#db.select().from(people);
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
    return await this.#db
      .delete(people)
      .where(eq(people.id, id))
      .returning();
  }
}
