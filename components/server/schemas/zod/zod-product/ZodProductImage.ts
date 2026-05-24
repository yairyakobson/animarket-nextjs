import { z } from "zod";

export const zodProductImageSchema = z.object({
  public_id: z.string(),
  url: z.url(),
  signed_url: z.url()
});