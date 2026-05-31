import { z } from "zod";

export const zodReviewerSchema = z.nonoptional(z.coerce.string());