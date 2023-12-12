import type { z } from "zod";
import { schema } from "./user";

export type User = z.infer<typeof schema>;
