import { z } from "zod";

import { zodProductDataSchema } from "../zod-product/ZodProductData";
import { zodCartItemSchema } from "./ZodCartItem";

export const zodCartProductsSchema = zodProductDataSchema.pick({
  name: true,
  price: true,
  image: true
})
.extend({
  quantity: zodCartItemSchema
});

export type ZodCartProducts = z.infer<typeof zodCartProductsSchema>;