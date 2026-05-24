import { z } from "zod";

export const zodSellerSchema = z.nonoptional(z.coerce.string());