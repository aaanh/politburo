import { X } from "lucide-react";
import { z } from "zod";

export const PeopleProfileSchema = z.object({
  dob: z.string(),
  resume: z.string(),
  wikipedia: z.string().nullable(),
});

export const CreatePeopleSchema = z.object({
  name: z.string(),
  profile: PeopleProfileSchema.nullable(),
});
