import { z } from "zod";

export const zodSellerSchema = z.coerce.string().optional();