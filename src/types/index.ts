import { z } from "zod";
import { CreatePeopleSchema, PeopleProfileSchema } from "./zod-schema";

export type PeopleProfile = z.infer<typeof PeopleProfileSchema>;
export type CreatePeople = z.infer<typeof CreatePeopleSchema>;
